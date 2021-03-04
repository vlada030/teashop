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
import { Products } from "./pages";
const dotenv = require('dotenv');

dotenv.config({path: '/.env'});

console.log(process.env.DOMAIN, process.env.CLIENTID);

ReactDOM.render(
    <Auth0Provider
        domain={process.env.DOMAIN}
        clientId={process.env.CLIENTID}
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
    >
        <GlobalProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </GlobalProvider>
    </Auth0Provider>,
    document.getElementById("root")
);
