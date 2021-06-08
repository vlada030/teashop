import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Header} from '../Sidebar'

describe('Sidebar test', () => {
    test('Render User Panel title header', () => {
        const user = {
            userName: 'Petar',
            role: 'user',
            favorites: []
        }
        const placeholderFn = () => {}

        render(<Header user={user} closeSidebar={placeholderFn} />)

        expect(screen.getByText(/user panel/i)).toBeInTheDocument()
        expect(screen.queryByText(/admin panel/i)).not.toBeInTheDocument()

    })

    test('Render User Panel title header', () => {
        const user = null
        const placeholderFn = () => {}

        render(<Header user={user} closeSidebar={placeholderFn} />)

        expect(screen.getByText(/user panel/i)).toBeInTheDocument()
        expect(screen.queryByText(/admin panel/i)).not.toBeInTheDocument()

    })

    test('Render Admin Panel title header', () => {
        const user = {
            userName: 'Petar',
            role: 'admin',
            favorites: []
        }
        const placeholderFn = () => {}

        render(<Header user={user} closeSidebar={placeholderFn} />)

        expect(screen.getByText(/admin panel/i)).toBeInTheDocument()
        expect(screen.queryByText(/user panel/i)).not.toBeInTheDocument()

    })

    test('SVG closes sidebar', () => {
        const user = {
            userName: 'Petar',
            role: 'admin',
            favorites: []
        }
        const closeSidebarMock = jest.fn()

        render(<Header user={user} closeSidebar={closeSidebarMock} />)

        userEvent.click(screen.getByRole('button'))
        expect(closeSidebarMock).toHaveBeenCalledTimes(1)    

    })

    test.todo('Check if Sidebar component have display: none at @media min-width: 992px')
})