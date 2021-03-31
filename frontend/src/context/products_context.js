import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import {useUserContext} from '../context/user_context';
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  UPDATE_FAVORITES_LIST,
  PULL_FAVORITES_LIST
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
  errorMsg: '',
  favoriteProducts: []
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {user} = useUserContext();

  const fetchProducts = async () => {
    dispatch({type: GET_PRODUCTS_BEGIN})
    
    try {
      const { data } = await axios('/allproducts');
      //console.log(data);
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: data.data});
    } catch (error) {
      const errData = error.response.data;
      console.log(errData);
      dispatch({type: GET_PRODUCTS_ERROR, payload: errData})
    }  
  }

  const fetchSingleProduct = async ( id ) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN});

    try {
      const { data } = await axios(`/allproducts/${id}`);
      //console.log(data);
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.data});
    } catch (error) {
      const errData = error.response.data;
      //console.log(errData);
      dispatch({type: GET_SINGLE_PRODUCT_ERROR, payload: errData});
    }
  }

  const loadFavorites = () => {
    let tempFavoritesList = [];
    
    if (user) {
      tempFavoritesList = user.favorites;
    }
    //console.log(user);
    dispatch({type: PULL_FAVORITES_LIST, payload: tempFavoritesList})
  }

  const updateFavorites = (id) => {
    dispatch({type: UPDATE_FAVORITES_LIST, payload: id})
  }

  // ucitaj proizvode prilikom podizanja app
  useEffect(() => {
  
    fetchProducts();
  
  }, []);

  // ucitaj favorite items kad se user loguje
  useEffect(() => {
    loadFavorites();

    // eslint-disable-next-line
  }, [user])  



  return (
    <ProductsContext.Provider value={{...state, fetchSingleProduct, updateFavorites}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
