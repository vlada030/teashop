import {PICK_AUTHENTICATION_PAGE, SET_USER, SET_INFO, UPDATE_USER_DATA} from '../actions';

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

      // update favorites listu
      case UPDATE_USER_DATA: {
        return({...state, user: action.payload})
      }
  
      default: 
      throw new Error(`No Matching "${action.type}" - action type`)
    }
  
  }
  
  export default user_reducer;
