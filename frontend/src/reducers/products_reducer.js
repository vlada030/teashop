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

const products_reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BEGIN: {
      return ({...state, productsLoading: true, errorMsg: ''})
    }

    case GET_PRODUCTS_SUCCESS: {
      const featuredProducts = action.payload.filter(({featured}) => featured === true)
      return ({...state, productsLoading: false, products: action.payload, featuredProducts})
    }

    case GET_PRODUCTS_ERROR: {
      return ({...state, productsLoading: false, productsError: true, errorMsg: action.payload.message})
    }

    case GET_SINGLE_PRODUCT_BEGIN: {
      return ({...state, singleProductLoading: true, singleProductError: false, errorMsg: ''})
    }

    case GET_SINGLE_PRODUCT_SUCCESS: {
      return ({...state, singleProductLoading: false, singleProduct: action.payload})
    }

    case GET_SINGLE_PRODUCT_ERROR: {
      return ({...state, singleProductLoading: false, singleProductError: true, errorMsg: action.payload.message})
    }

    case PULL_FAVORITES_LIST: {
      return({...state, favoriteProducts: action.payload})
    }

    case UPDATE_FAVORITES_LIST: {
      const product = action.payload;
      let {favoriteProducts} = {...state};

      const isLiked = favoriteProducts.find(item => item.id === product.id);

      if (isLiked) {
        favoriteProducts = favoriteProducts.filter(item => item.id !== product.id);
      } else {
        favoriteProducts.push(product);
      }
      //console.log(favoriteProducts);
      return({...state, favoriteProducts})
    }

    case CLEAR_FAVORITES_LIST: {
      return({...state, favoriteProducts: []})
    }

    default: 
    throw new Error(`No Matching "${action.type}" - action type`)
  }

}

export default products_reducer
