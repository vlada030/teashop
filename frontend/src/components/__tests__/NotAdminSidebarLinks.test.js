import React from 'react'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import  NotAdminSidebarLinks from '../NotAdminSidebarLinks'
import userEvent from '@testing-library/user-event'

describe('Sidebar links check', () => {
    test('User is not logged', () => {
        const user = null
        const placeholderFn = () => {}
        render(
            <BrowserRouter>
                <NotAdminSidebarLinks user={user} closeSidebar={placeholderFn}/>
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
        const placeholderFn = () => {}

        render(
            <BrowserRouter>
                <NotAdminSidebarLinks user={user} closeSidebar={placeholderFn}/>
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

        const placeholderFn = () => {}

        const {container} = render(
            <BrowserRouter>
                <NotAdminSidebarLinks user={user} closeSidebar={placeholderFn}/>
            </BrowserRouter>
        )
        const ulElmnt = container.querySelector('.links')
        expect(ulElmnt).toBeFalsy()
    })

    test('Click on any link closes sidebar', () => {
        const user = {
            userName: 'Petar',
            role: 'user',
            favorites: []
        }
        const closeSidebarMock = jest.fn()

        render(
            <BrowserRouter>
                <NotAdminSidebarLinks user={user} closeSidebar={closeSidebarMock}/>
            </BrowserRouter>
        );
        
        userEvent.click(screen.getByText(/početna/i))
        expect(closeSidebarMock).toHaveBeenCalledTimes(1)

        userEvent.click(screen.getByText(/uvod/i))
        expect(closeSidebarMock).toHaveBeenCalledTimes(2)

        userEvent.click(screen.getByText(/proizvodi/i))
        expect(closeSidebarMock).toHaveBeenCalledTimes(3)

        userEvent.click(screen.getByText(/kasa/i))
        expect(closeSidebarMock).toHaveBeenCalledTimes(4)
    })
})