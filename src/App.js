import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Home, About, Cart, Products, SingleProduct, Checkout, Error, ProtectedRoute } from './pages'

function App() {
  return <BrowserRouter>
            <Navbar />
            <Sidebar />

            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>

              <Route exact path='/about'>
                <About />
              </Route>

              <Route exact path='/cart'>
                <Cart />
              </Route>

              <Route exact path='/products'>
                <Products />
              </Route>

              <Route exact path='/products/:id' children={<SingleProduct />}>
              </Route>

              <ProtectedRoute path='/checkout'>
                <Checkout />
              </ProtectedRoute>

              <Route path='*'>
                <Error />
              </Route>

            </Switch> 

            <Footer />
        </BrowserRouter>
}

export default App
