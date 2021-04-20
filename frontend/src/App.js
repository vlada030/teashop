import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer, Modal, ScrollToTopBtn } from "./components";
import {
    Home,
    About,
    Cart,
    Products,
    SingleProduct,
    Checkout,
    Error,
    ProtectedUserRoute,
    AuthenticationPage,
    FavoriteProducts,
    ProtectedAdminRoute,
    UpdateProductPage,
    CreateProductPage,
    AdminPage,
    IsUserAdmin
} from "./pages";

// mora da sa uvede ova komponenta jer iako je user logovan kada se ide direktno na /checkout OPET VRACA na pocetnu
// obratiti paznju na protected route - ukoliko nije wrapovana ovoj ruti i dalje moze da se pristupi direktnim linkom - ODLICNA KONSTRUKCIJA

function App() {
    
    return (
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                <Modal />

                <Switch>
                    <IsUserAdmin exact path="/">
                        <Home />
                    </IsUserAdmin>

                    <ProtectedAdminRoute exact path='/admin'>
                        <AdminPage />
                    </ProtectedAdminRoute>

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

                    <ProtectedUserRoute exact path="/products/favorites">
                        <FavoriteProducts />
                    </ProtectedUserRoute>

                    {/* <ProtectedAdminRoute exact path='/products/update-product'>
                        <UpdateProductPage />
                    </ProtectedAdminRoute>

                    <ProtectedAdminRoute exact path='/products/create-product'>
                        <CreateProductPage />
                    </ProtectedAdminRoute> */}
                    
                    <Route
                        exact
                        path="/products/:id"
                        children={<SingleProduct />}
                    ></Route>    

                    <ProtectedUserRoute path="/checkout">
                        <Checkout />
                    </ProtectedUserRoute>

                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>

                <ScrollToTopBtn />
                <Footer />
            </BrowserRouter>
    );
}

export default App;
