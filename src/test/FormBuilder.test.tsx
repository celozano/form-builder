import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormBuilder from '../components/FormBuilder'
import type { Form } from '../../types'

const noop = () => {}

const existingForm: Form = {
  id: 1,
  name: 'Existing Form',
  items: [{ id: 1, name: 'email', label: 'Email', type: 'string', required: true }],
}

describe('FormBuilder', () => {
  it('shows "Create Form" when not editing, "Edit Form" when editing', () => {
    const { rerender } = render(<FormBuilder editing={null} onSave={noop} onCancel={noop} />)
    expect(screen.getByRole('heading', { name: /Create Form/i })).toBeInTheDocument()

    rerender(<FormBuilder editing={existingForm} onSave={noop} onCancel={noop} />)
    expect(screen.getByRole('heading', { name: /Edit Form/i })).toBeInTheDocument()
  })

  it('alerts when saving with an empty form name', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<FormBuilder editing={null} onSave={noop} onCancel={noop} />)
    await userEvent.click(screen.getByRole('button', { name: /^Save$/i }))
    expect(alertSpy).toHaveBeenCalled()
    alertSpy.mockRestore()
  })

  it('calls onSave with the entered form name', async () => {
    const onSave = vi.fn()
    render(<FormBuilder editing={null} onSave={onSave} onCancel={noop} />)
    await userEvent.type(screen.getByRole('textbox', { name: /Form Name/i }), 'My Form')
    await userEvent.click(screen.getByRole('button', { name: /^Save$/i }))
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'My Form' }))
  })

  it('adds and removes fields', async () => {
    render(<FormBuilder editing={null} onSave={noop} onCancel={noop} />)
    await userEvent.click(screen.getByRole('button', { name: /Add Field/i }))
    expect(screen.getByText('Field 2')).toBeInTheDocument()

    await userEvent.click(screen.getAllByRole('button', { name: /Remove/i })[1])
    expect(screen.queryByText('Field 2')).not.toBeInTheDocument()
  })
})
