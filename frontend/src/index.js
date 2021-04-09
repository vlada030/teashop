import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { GlobalProvider } from "./context/global_context";
// const {resolve, join} = require('path');

require('dotenv').config();
// console.log(join(__dirname, 'frontend','.env'));
// console.log(resolve(__dirname, '../../.env'));

ReactDOM.render(
    <GlobalProvider>
        <UserProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </GlobalProvider>,
    document.getElementById("root")
);
