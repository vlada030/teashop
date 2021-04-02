import React, { useContext, useEffect, useReducer} from 'react';
import axios from 'axios';

import {PICK_AUTHENTICATION_PAGE, SET_USER, SET_INFO, UPDATE_USER_DATA} from '../actions';
import reducer from '../reducers/user_reducer';

const getUserFromLocalStorage = () => {
  let user = false;
  const tempUser = localStorage.getItem('user');
  if (tempUser) {
    user = JSON.parse(tempUser);
  }
  return user;
}

const UserContext = React.createContext();
const initialState = {
  loginPage: true,
  user: getUserFromLocalStorage(),
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
        url: '/auth/login',
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
        url: '/auth/register',
        method: 'POST',
        withCredentials: true,
        data: userData
      })
      if (data.success === true) {
        dispatch({type: PICK_AUTHENTICATION_PAGE});
        dispatch({type: SET_INFO, payload: 'Uspešno kreiran korisnik, sad možete da se ulogujete.'});
      }
    } catch (error) {
      if (error.response) {
        dispatch({type: SET_INFO, payload: error.response.data.message});
      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        dispatch({type: SET_INFO, payload: error.message});
      }
    }
  }

  const userLogout = async () => {
    try {
      const {data} = await axios({
        url: '/auth/logout',
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

  const updateUserData = (newData) => {
    dispatch({type: UPDATE_USER_DATA, payload: newData})
    // zapamti u local storage

    // posalji na server

  }

  const fetchUser = userData => {
    state.loginPage ? userLogin(userData) : userRegister(userData);
    }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user])
    
  return (
    <UserContext.Provider value={{...state, toggleForm, fetchUser, userLogout, updateUserData}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
