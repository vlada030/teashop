import {PICK_AUTHENTICATION_PAGE, SET_USER, SET_INFO} from '../actions';

const user_reducer = (state, action) => {
    switch (action.type) {
      case PICK_AUTHENTICATION_PAGE: {
        return ({...state, loginPage: !state.loginPage, infoMsg: ''})
      }
  
      case SET_USER: {
        return ({...state, user: action.payload, infoMsg: ''})
      }
  
      case SET_INFO: {
        return ({...state, infoMsg: action.payload})
      }
  
      default: 
      throw new Error(`No Matching "${action.type}" - action type`)
    }
  
  }
  
  export default user_reducer;
