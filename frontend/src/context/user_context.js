import React, { useContext, useEffect, useReducer} from 'react';
import axios from 'axios';

import {PICK_AUTHENTICATION_PAGE, SET_USER, SET_INFO} from '../actions';
import reducer from '../reducers/user_reducer';

const UserContext = React.createContext();
const initialState = {
  loginPage: true,
  user: false,
  infoMsg: ''
};

export const UserProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleForm = () => {
    dispatch({type: PICK_AUTHENTICATION_PAGE});
  }

  const userLogin = async(userData) => {
    try {
      const {data} = await axios({
        url: '/login',
        method: 'POST',
        withCredentials: true,
        data: userData
      })

      dispatch({type: SET_USER, payload: data.data});
      //setUser(data.data);  
      
    } catch (error) {
      if (error.response) {
        dispatch({type: SET_INFO, payload: error.response.data.message});
      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        dispatch({type: SET_INFO, payload: error.message});
      }
    }
  }

  const userRegister = async(userData) => {
    try {
      const {data} = await axios({
        url: '/register',
        method: 'POST',
        withCredentials: true,
        data: userData
      })
      //console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const userLogout = async () => {
    try {
      const {data} = await axios({
        url: '/logout',
        method: 'DELETE',
        withCredentials: true
      });
      
      dispatch({type: SET_USER, payload: false});
      
    } catch (error) {
      if (error.response) {
        dispatch({type: SET_INFO, payload: error.response.data.message});

      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        dispatch({type: SET_INFO, payload: error.message});
      }
    }
  }

  const fetchUser = userData => {
    state.loginPage ? userLogin(userData) : userRegister(userData);
    }
    
  return (
    <UserContext.Provider value={{...state, toggleForm, fetchUser, userLogout}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
