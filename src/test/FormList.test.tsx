import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormList from '../components/FormList'
import type { Form } from '../../types'

const form = (overrides?: Partial<Form>): Form => ({
  id: 1, name: 'My Form', items: [], ...overrides,
})

const noop = () => {}

describe('FormList', () => {
  it('shows empty state when there are no forms', () => {
    render(<FormList forms={[]} onCreate={noop} onEdit={noop} onDelete={noop} />)
    expect(screen.getByText(/No forms yet/)).toBeInTheDocument()
  })

  it('renders form names', () => {
    render(<FormList forms={[form({ name: 'Survey' })]} onCreate={noop} onEdit={noop} onDelete={noop} />)
    expect(screen.getByText('Survey')).toBeInTheDocument()
  })

  it('calls onCreate when "Create Form" is clicked', async () => {
    const onCreate = vi.fn()
    render(<FormList forms={[]} onCreate={onCreate} onEdit={noop} onDelete={noop} />)
    await userEvent.click(screen.getByRole('button', { name: /Create Form/i }))
    expect(onCreate).toHaveBeenCalledOnce()
  })

  it('calls onDelete with the correct id', async () => {
    const onDelete = vi.fn()
    render(<FormList forms={[form({ id: 5 })]} onCreate={noop} onEdit={noop} onDelete={onDelete} />)
    await userEvent.click(screen.getByTestId('delete-5'))
    expect(onDelete).toHaveBeenCalledWith(5)
  })
})
