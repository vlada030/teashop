import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'

import CartPage from '../CartPage'
import {CartProvider, CartContext}  from "../../context/cart_context"
import {UserProvider} from '../../context/user_context'
import {GlobalProvider} from '../../context/global_context'

describe("CartPage component", () => {
    test("Cart is empty", () => {
        render(
            <BrowserRouter>
                <CartProvider>
                    <CartPage />
                </CartProvider>
            </BrowserRouter>
        )
        expect(screen.getByText(/vaša korpa je prazna/i)).toBeInTheDocument()
        expect(screen.getByText(/pretra.ite proizvode/i)).toBeInTheDocument()
    })

    test("Cart contains products", () => {

        const cart = [
            {
                id: 9999730,
                name: "test 2",
                unit: 30,
                price: 17.5,
                amount: 1,
                image: "/",
                stock: 40,
            },
        ]

        render(
            <BrowserRouter>
                <GlobalProvider>
                    <UserProvider>
                        <CartContext.Provider value={{ cart }}>
                            <CartPage />
                        </CartContext.Provider>
                    </UserProvider>
                </GlobalProvider>
            </BrowserRouter>
        )

        expect(screen.getByText(/nastavi kupovinu/i)).toBeInTheDocument()
        expect(screen.getByText(/isprazni korpu/i)).toBeInTheDocument()
        expect(screen.getByText(/prijava/i)).toBeInTheDocument()
    })
})