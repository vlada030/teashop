import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const initialState = {
  cart: [],
  totalItems: 0, 
  totalAmount: 0,
  shipping: 460
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, unit, price, amount, product) => {
    dispatch({type: ADD_TO_CART, payload: {id, unit, price, amount, product}});
  }

  const removeItem = id => {}
  const toogleAmount = (id, value) => {}
  const clearCart = () => {}

  return (
    <CartContext.Provider value={{...state, addToCart, removeItem, toogleAmount, clearCart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
