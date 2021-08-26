import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const SHIPPING_COST = 400

const getCartFromLocalStorage = () => {
  let storage = localStorage.getItem('cart');
  if (storage) {
    return JSON.parse(storage)
  }

  return []
}

const initialState = {
  cart: getCartFromLocalStorage(),
  totalItems: 0, 
  totalAmount: 0,
  shipping: SHIPPING_COST
}

export const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, unit, price, amount, product) => {
    dispatch({type: ADD_TO_CART, payload: {id, unit, price, amount, product}});
  }

  const removeItem = id => {
    dispatch({type: REMOVE_CART_ITEM, payload: id});
  }

  const toggleAmount = (id, value) => {
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}})
  }

  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }

  useEffect(() => {
    dispatch({type: COUNT_CART_TOTALS});
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider value={{...state, addToCart, removeItem, toggleAmount, clearCart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
