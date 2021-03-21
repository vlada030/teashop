import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  
  const [loginPage, setLoginPage] = useState(true);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState('');

  const toggleForm = () => {
    setLoginPage(!loginPage)
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
      //console.log(error.response.data.message);
      setErr(error.response.data.message)
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
      
    }
  }

  const fetchUser = userData => {
    loginPage ? userLogin(userData) : userRegister(userData);
    }
    
  return (
    <UserContext.Provider value={{loginPage, user, err, toggleForm, fetchUser, userLogout}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
