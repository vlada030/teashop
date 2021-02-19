import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

import database from '../firebaseConfig';
const databaseRef = database.database().ref();


const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: []
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = () => {
    dispatch({type: GET_PRODUCTS_BEGIN})
    // POSTAVLJANJE FIREBASE
    databaseRef.child("productsList").once("value")
    .then(snapshot => {
        const data = snapshot.val();
        // console.log(data);
        dispatch({type: GET_PRODUCTS_SUCCESS, payload: data});
    })
    .catch((error) => {
        // console.log("Error: " + error.code);
        dispatch({type: GET_PRODUCTS_ERROR})
        
    });
    
  }

  useEffect(() => {
  
    fetchProducts();
  
  }, []);

  return (
    <ProductsContext.Provider value={{...state}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
