import React from 'react'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import  {Titles, RenderLinks} from '../NotAdminNavLinks'
import {links} from '../../utils/constants'
import {UserProvider} from '../../context/user_context'
import {GlobalProvider} from '../../context/global_context'


describe('Navigation links check', () => {
    test('User is not logged', () => {
        const user = null
        render(
            <BrowserRouter>
                <Titles links={links} user={user} />
            </BrowserRouter>
        );
        //screen.debug()

        expect(screen.getByText(/početna/i)).toBeInTheDocument()
        expect(screen.getByText(/uvod/i)).toBeInTheDocument()
        expect(screen.getByText(/proizvodi/i)).toBeInTheDocument()
        expect(screen.queryByText(/kasa/i)).not.toBeInTheDocument()
    })
    test('User is logged in', () => {
        const user = {
            userName: 'Petar',
            role: 'user',
            favorites: []
        }

        render(
            <BrowserRouter>
                <Titles links={links} user={user} />
            </BrowserRouter>
        );

        expect(screen.getByText(/početna/i)).toBeInTheDocument()
        expect(screen.getByText(/uvod/i)).toBeInTheDocument()
        expect(screen.getByText(/proizvodi/i)).toBeInTheDocument()
        expect(screen.getByText(/kasa/i)).toBeInTheDocument()
    })
    test('User is admin', () => {
        const user = {
            userName: 'Petar',
            role: 'admin',
            favorites: []
        }

        render(<RenderLinks user={user} />)

        expect(screen.getByText(/admin panel/i)).toBeInTheDocument()
        expect(screen.getByText(/admin panel/i)).toBeTruthy()
    })

    test.todo('Nav links are disabled if @media rule is min-width: 992px')
})