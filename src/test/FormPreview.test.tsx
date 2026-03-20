import { render, screen } from '@testing-library/react'
import FormPreview from '../components/FormPreview'
import type { Item } from '../../types'

const item = (overrides?: Partial<Item>): Item => ({
  id: 1, name: 'field', label: 'My Field', type: 'string', required: false,
  ...overrides,
})

describe('FormPreview', () => {
  it('renders a text input for string type', () => {
    render(<FormPreview name="Test" items={[item({ type: 'string' })]} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders a number input for number type', () => {
    render(<FormPreview name="Test" items={[item({ type: 'number' })]} />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('renders a checkbox for boolean type', () => {
    render(<FormPreview name="Test" items={[item({ type: 'boolean' })]} />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('shows required asterisk when required is true', () => {
    render(<FormPreview name="Test" items={[item({ required: true })]} />)
    expect(screen.getAllByText(/\*/).length).toBeGreaterThan(0)
  })
})
