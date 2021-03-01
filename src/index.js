import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import {GlobalProvider} from './context/global_context'
import { Auth0Provider } from '@auth0/auth0-react'
import { Products } from './pages'

ReactDOM.render(
    <GlobalProvider>
        <ProductsProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </ProductsProvider>
    </GlobalProvider>,
    document.getElementById("root")
);
