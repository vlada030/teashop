import {screen, render, getByPlaceholderText} from '@testing-library/react'
import {UserInterface} from '../../pages/AuthenticationPage'

describe('Authentication page', () => {
    test('Login Page displayed', () => {
        render (<UserInterface loginPage={true}/>)

        expect(screen.queryByPlaceholderText(/ime/i)).not.toBeInTheDocument()
        expect(screen.getByPlaceholderText(/ e-mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/ifra/i)).toBeInTheDocument()
        expect(screen.getByText(/po.alji/i)).toBeInTheDocument()
        expect(screen.getByText(/ukoliko nemate nalog/i)).toBeInTheDocument()
        expect(screen.getByText(/registrujte/i)).toBeInTheDocument()
        
    })
})