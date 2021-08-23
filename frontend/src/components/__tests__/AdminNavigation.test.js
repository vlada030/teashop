import {render, screen} from '@testing-library/react'    
import userEvent from '@testing-library/user-event'  
import AdminNavigation from '../AdminNavigation'

describe('Admin Navigation Component', () => {
    test('Check for presence appropriate admin buttons', () => {
        const handleView = () => {}
        const view = 'test'

        const {container} = render (<AdminNavigation view={view} handleView={handleView} />)

        expect(screen.getByText(/proizvod/i)).toBeInTheDocument()
        expect(screen.getByText(/korisnik/i)).toBeInTheDocument()
        expect(screen.getByText(/svi/i)).toBeInTheDocument()
        expect(screen.getAllByText(/dodaj/i)).toHaveLength(2)
        expect(screen.getAllByText(/izmeni/i)).toHaveLength(2)
        expect(screen.getByText(/obri.i/i)).toBeInTheDocument()
        expect(container.querySelectorAll('.active')).toHaveLength(0)
    })

    test('Check for buttons click', () => {
        const handleView = jest.fn()
        const view = 'test'

        render(<AdminNavigation view={view} handleView={handleView} />)

        userEvent.click(screen.getByText(/svi/i))
        expect(handleView).toHaveBeenCalledTimes(1)

        userEvent.click(screen.getAllByText(/dodaj/i)[0])
        expect(handleView).toHaveBeenCalledTimes(2)

        userEvent.click(screen.getAllByText(/izmeni/i)[0])
        expect(handleView).toHaveBeenCalledTimes(3)

        userEvent.click(screen.getByText(/obri.i/i))
        expect(handleView).toHaveBeenCalledTimes(4)

        userEvent.click(screen.getAllByText(/dodaj/i)[1])
        expect(handleView).toHaveBeenCalledTimes(5)

        userEvent.click(screen.getAllByText(/izmeni/i)[1])
        expect(handleView).toHaveBeenCalledTimes(6)

    })
})