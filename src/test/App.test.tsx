import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

async function createForm(name: string) {
  await userEvent.click(screen.getByRole('button', { name: /Create Form/i }))
  await userEvent.type(screen.getByRole('textbox', { name: /Form Name/i }), name)
  await userEvent.click(screen.getByRole('button', { name: /^Save$/i }))
}

describe('App', () => {
  it('shows the forms list on initial render', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /My Forms/i })).toBeInTheDocument()
  })

  it('navigates to builder and back on create / cancel', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /Create Form/i }))
    expect(screen.getByRole('heading', { name: /Create Form/i })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(screen.getByRole('heading', { name: /My Forms/i })).toBeInTheDocument()
  })

  it('adds a saved form to the list', async () => {
    render(<App />)
    await createForm('Survey')
    expect(screen.getByText('Survey')).toBeInTheDocument()
  })

  it('removes a form when Delete is clicked', async () => {
    render(<App />)
    await createForm('To Delete')
    await userEvent.click(screen.getByTestId(/^delete-/))
    expect(screen.queryByText('To Delete')).not.toBeInTheDocument()
  })
})
