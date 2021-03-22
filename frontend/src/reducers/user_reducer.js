import {PICK_AUTHENTICATION_PAGE} from '../actions';

const user_reducer = (state, action) => {
    switch (action.type) {
      case PICK_AUTHENTICATION_PAGE: {
        return ({...state, loginPage: !state.loginPage})
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
  
      default: 
      throw new Error(`No Matching "${action.type}" - action type`)
    }
  
  }
  
  export default user_reducer;
