import React, { useContext, useEffect, useReducer} from 'react';
import axios from 'axios';

import {PICK_AUTHENTICATION_PAGE} from '../actions';
import reducer from '../reducers/user_reducer';

const UserContext = React.createContext();
const initialState = {
  loginPage: true,
  user: false,
  infoMsg: ''
};

export const UserProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loginPage, setLoginPage] = useState(true);
  const [user, setUser] = useState(false);
  const [info, setInfo] = useState('');

  const toggleForm = () => {
    //setLoginPage(!loginPage)
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

      setUser(data.data);  
      
    } catch (error) {
      if (error.response) {
        setInfo(error.response.data.message)
      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        setInfo(error.message)
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
      setUser(data.data);
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
      
      setUser(false);
      
    } catch (error) {
      if (error.response) {
        setInfo(error.response.data.message)
      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        setInfo(error.message)
      }
    }
  }

  const fetchUser = userData => {
    loginPage ? userLogin(userData) : userRegister(userData);
    }
    
  return (
    <UserContext.Provider value={{...state, toggleForm, fetchUser, userLogout}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
