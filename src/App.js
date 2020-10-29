import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import pages
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Error from './pages/Error'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'

// import Components
import Header from './components/Header'
import Alert from './components/Alert'
import PrivateRoute from './components/PrivateRoute'
import Scroll from './components/ScrollButton'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Alert />
      <Scroll />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact 
          path="/products/:id" 
          children={<ProductDetails></ProductDetails>}
        ></Route>
        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
