import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { GlobalProvider } from "./context/global_context";
import { Auth0Provider } from "@auth0/auth0-react";
// const {resolve, join} = require('path');

require('dotenv').config();
// console.log(join(__dirname, 'frontend','.env'));
// console.log(resolve(__dirname, '../../.env'));

ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENTID}
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
    >
        <UserProvider>
            <GlobalProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </FilterProvider>
                </ProductsProvider>
            </GlobalProvider>
        </UserProvider>
    </Auth0Provider>,
    document.getElementById("root")
);