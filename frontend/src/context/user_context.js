import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  
  // eslint-disable-next-line
  const {isAuthenticated, loginWithRedirect, logout, user,isLoading, error} = useAuth0();

  const [customer, setCustomer] = useState(false);

  useEffect(() => {
    if (user) {
      setCustomer(user)
  }}, [user]);

  return (
    <UserContext.Provider value={{loginWithRedirect, logout, customer}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
