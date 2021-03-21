import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
    Home,
    About,
    Cart,
    Products,
    SingleProduct,
    Checkout,
    Error,
    ProtectedRoute,
    AuthWrapper,
    AuthenticationPage
} from "./pages";

// mora da sa uvede ova komponenta jer iako je user logovan kada se ide direktno na /checkout OPET VRACA na pocetnu
// obratiti paznju na protected route - ukoliko nije wrapovana ovoj ruti i dalje moze da se pristupi direktnim linkom - ODLICNA KONSTRUKCIJA

function App() {
    return (
        <AuthWrapper>
            <BrowserRouter>
                <Navbar />
                <Sidebar />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/about">
                        <About />
                    </Route>

                    <Route exact path="/cart">
                        <Cart />
                    </Route>

                    <Route exact path="/authentication">
                        <AuthenticationPage />
                    </Route>

                    <Route exact path="/products">
                        <Products />
                    </Route>

                    <Route
                        exact
                        path="/products/:id"
                        children={<SingleProduct />}
                    ></Route>

                    <ProtectedRoute path="/checkout">
                        <Checkout />
                    </ProtectedRoute>

                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>

                <Footer />
            </BrowserRouter>
        </AuthWrapper>
    );
}

export default App;
