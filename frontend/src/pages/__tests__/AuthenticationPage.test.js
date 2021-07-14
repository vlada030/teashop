import {screen, render} from '@testing-library/react'
import AuthenticationPage, {UserInterface} from '../AuthenticationPage'
import userEvent from '@testing-library/user-event'

describe('Authentication page', () => {
    test('Login Page displayed', () => {
        render (<UserInterface loginPage={true}/>)

        expect(screen.getByText(/prijava/i)).toBeInTheDocument()
        expect(screen.queryByPlaceholderText(/ime/i)).not.toBeInTheDocument()
        expect(screen.getByPlaceholderText(/ e-mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/ifra/i)).toBeInTheDocument()
        expect(screen.getByText(/po.alji/i)).toBeInTheDocument()
        expect(screen.getByText(/ukoliko nemate nalog/i)).toBeInTheDocument()
        expect(screen.getByText(/registrujte/i)).toBeInTheDocument()
        
    })

    test('Registration Page displayed', () => {
        render (<UserInterface loginPage={false}/>)

        expect(screen.getByText(/registracija/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/ime/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/ e-mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/.ifra/i)).toBeInTheDocument()
        expect(screen.getByText(/po.alji/i)).toBeInTheDocument()
        expect(screen.getByText(/povratak na/i)).toBeInTheDocument()
        expect(screen.getByText(/prijavu/i)).toBeInTheDocument()
        
    })

    test('Submit the form', () => {
        const handleSubmit = jest.fn()

        render(<UserInterface loginPage={true} handleSubmit={handleSubmit}/>)

        userEvent.click(screen.getByText(/po.alji/i))
        expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    test('Toggle Login / Registration Page', () => {
        const handleToggleForm = jest.fn()

        render(<UserInterface loginPage={true} handleToggleForm={handleToggleForm} />)

        userEvent.click(screen.getByText(/registrujte/i))
        
        expect(handleToggleForm).toHaveBeenCalledTimes(1)

    })

    test('User types username', () => {
        const handleUsername = jest.fn()

        render(<UserInterface loginPage={false} handleUsername={handleUsername} />)

        userEvent.type(screen.getByPlaceholderText(/ime/i), 'test')

        expect(handleUsername).toHaveBeenCalledTimes(4)
    })

    test('User types e-mail', () => {
        const handleEmail = jest.fn()

        render(<UserInterface loginPage={true} handleEmail={handleEmail}/>)

        userEvent.type(screen.getByPlaceholderText(/e-mail/i),'test')

        expect(handleEmail).toHaveBeenCalledTimes(4)
    })

    test('User types password', () => {
        const handlePassword = jest.fn()

        render(<UserInterface loginPage={true} handlePassword={handlePassword}/>)

        userEvent.type(screen.getByPlaceholderText(/.ifra/i),'test')

        expect(handlePassword).toHaveBeenCalledTimes(4)
    })

    test('Display Info Message', () => {
        render(<UserInterface loginPage={true} infoMsg='test'/>)

        expect(screen.getByText('test')).toBeInTheDocument()
    })
})