import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR
} from '../actions'

import axios from 'axios';

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {},
  errorMsg: ''
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // preuzmi sve proizvode
  const fetchProducts = async () => {
    dispatch({type: GET_PRODUCTS_BEGIN})
    
    try {
      const { data } = await axios('/allproducts');
      //console.log(data);
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: data.data});
    } catch (error) {
      if (error.response) {
        dispatch({type: GET_PRODUCTS_ERROR, payload: error.response.data});
      } else {
        // u slucaju da nema mreze, a hocemo products izbacuje Promise pending
        dispatch({type: GET_PRODUCTS_ERROR, payload: error.message});
      }
    }  
  }

  // preuzmi jedan proizvod
  const fetchSingleProduct = async ( id ) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN});

    try {
      const { data } = await axios(`/allproducts/${id}`);
      //console.log(data);
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.data});
    } catch (error) {
      if (error.response) {
        dispatch({type: GET_SINGLE_PRODUCT_ERROR, payload: error.response.data});

      } else {
        // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
        dispatch({type: GET_SINGLE_PRODUCT_ERROR, payload: error.message});
      }
    }
  }

  // ucitaj proizvode prilikom podizanja app
  useEffect(() => {
  
    fetchProducts();
  
  }, []);

  return (
    <ProductsContext.Provider value={{...state, fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}

// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
