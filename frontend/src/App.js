import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer, Modal } from "./components";
import {
    Home,
    About,
    Cart,
    Products,
    SingleProduct,
    Checkout,
    Error,
    ProtectedRoute,
    AuthenticationPage,
    FavoriteProducts,
    ProtectedAdminRoute,
    UpdateProductPage
} from "./pages";

import {useGlobalContext} from './context/global_context';


// mora da sa uvede ova komponenta jer iako je user logovan kada se ide direktno na /checkout OPET VRACA na pocetnu
// obratiti paznju na protected route - ukoliko nije wrapovana ovoj ruti i dalje moze da se pristupi direktnim linkom - ODLICNA KONSTRUKCIJA

function App() {
    const {showModal, modalError, closeModal} = useGlobalContext();

    return (
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                {showModal ? <Modal type={modalError} handleClose={closeModal}/> : null}

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

                    <ProtectedRoute exact path="/products/favorites">
                        <FavoriteProducts />
                    </ProtectedRoute>

                    <ProtectedAdminRoute exact path='/products/update-product'>
                        <UpdateProductPage />
                    </ProtectedAdminRoute>
                    
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
    );
}

export default App;
