import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminPage from '../AdminPage'

import {GlobalProvider} from '../../context/global_context'
import  {FilterProvider}  from '../../context/filter_context'
import {ProductsProvider} from '../../context/products_context'

describe('Admin Page', () => {
    test('Check for Sidebar admin buttons presence', () => {
        render (<ProductsProvider>
                <FilterProvider>
                    <AdminPage />
            </FilterProvider>
            </ProductsProvider>)

        //screen.debug()
        expect(screen.getByText(/svi/i)).toHaveClass('active')
        expect(screen.getAllByText(/dodaj/i)).toHaveLength(2)
        expect(screen.getAllByText(/izmeni/i)).toHaveLength(2)
        expect(screen.getByText(/obri.i/i)).toBeInTheDocument()
    })

    test('Click on DODAJ button under Product Sidebar Section', () => {
        render(<GlobalProvider>
            <ProductsProvider>
                    <FilterProvider>
                        <AdminPage />
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>)

        const buttons = screen.getAllByText(/dodaj/i)
        userEvent.click(buttons[0])

        expect(screen.getByText(/dodaj proizvod/i)).toBeInTheDocument()
        expect(buttons[0]).toHaveClass('active')
    })

    test('Click on IZMENI button under Product Sidebar Section', () => {
        const {getAllByText, getByText} = render(<GlobalProvider>
            <ProductsProvider>
                    <FilterProvider>
                        <AdminPage />
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>)

            const buttons = getAllByText(/izmeni/i)
            userEvent.click(buttons[0])

            expect(getByText(/prona.i proizvod/i)).toBeInTheDocument()
            expect(buttons[0]).toHaveClass('active')
    })

    test('Click on OBRISI button under Product Sidebar Section', () => {
        const {getByText} = render(<GlobalProvider>
            <ProductsProvider>
                    <FilterProvider>
                        <AdminPage />
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>)

            const button = getByText(/obri.i/i)
            userEvent.click(button)

            expect(getByText(/obri.i proizvod/i)).toBeInTheDocument()
            expect(button).toHaveClass('active')
    })

    test('Click on DODAJ button under User Sidebar Section', () => {
        const {getAllByText, getByText} = render(<GlobalProvider>
            <ProductsProvider>
                    <FilterProvider>
                        <AdminPage />
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>)

            const buttons = getAllByText(/dodaj/i)
            userEvent.click(buttons[1])

            expect(getByText(/opcija je u razvoju/i)).toBeInTheDocument()
            expect(buttons[1]).toHaveClass('active')
    })

    test('Click on IZMENI button under User Sidebar Section', () => {
        const {getAllByText, getByText} = render(<GlobalProvider>
            <ProductsProvider>
                    <FilterProvider>
                        <AdminPage />
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>)

            const buttons = getAllByText(/izmeni/i)
            userEvent.click(buttons[1])

            expect(getByText(/opcija je u razvoju/i)).toBeInTheDocument()
            expect(buttons[1]).toHaveClass('active')
    })
})