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
  PULL_FAVORITES_LIST,
  CLEAR_FAVORITES_LIST
} from '../actions'

import axios from 'axios';

// const getFavoritesFromLocalStorage = () => {
//   let user = localStorage.getItem('user');
//   let tempUser = JSON.parse(user);

//   if (tempUser) {
//     return tempUser.favorites;
//   }

//   return []
// }

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

  // preuzmi sve proizvode
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

  // preuzmi jedan proizvod
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

  //preuzmi favorites listu kad se korisnik loguje
  const loadFavorites = () => {
    let tempFavoritesList = [];
    
    if (user) {
      tempFavoritesList = user.favorites;
    }
    //console.log(user);
    dispatch({type: PULL_FAVORITES_LIST, payload: tempFavoritesList})
  }

  // izmeni favorites listu
  const updateFavorites = (product) => {
    dispatch({type: UPDATE_FAVORITES_LIST, payload: product});
    // updajtuj local storage
    const favorites = getFavoritesFromLocalStorage();
    if (user) {
      let tempFavoriteProducts = favorites;
      console.log(tempFavoriteProducts);
      const isLiked = tempFavoriteProducts.find(item => item.id === product.id);

      if (isLiked) {
        tempFavoriteProducts = tempFavoriteProducts.filter(item => item.id !== product.id);
      } else {
        tempFavoriteProducts.push(product);
      }
      console.log(tempFavoriteProducts);

      localStorage.setItem('user', JSON.stringify({...user, favorites: tempFavoriteProducts}));
    }
  }


  // obrisi celu favorites listu
  const clearFavorites = () => {
    dispatch({type: CLEAR_FAVORITES_LIST})
  }

  // ucitaj proizvode prilikom podizanja app
  useEffect(() => {
  
    fetchProducts();
  
  }, []);

  // ucitaj favorite items kad se user loguje
  // useEffect(() => {
  //   loadFavorites();

  //   // eslint-disable-next-line
  // }, [user])  


  return (
    <ProductsContext.Provider value={{...state, fetchSingleProduct, updateFavorites, clearFavorites}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
