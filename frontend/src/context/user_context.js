import React, { useContext, useEffect, useReducer} from 'react';
import axios from 'axios';
import reducer from '../reducers/user_reducer';
import {useGlobalContext} from './global_context';

import {
    PICK_AUTHENTICATION_PAGE,
    SET_USER,
    UPDATE_USER_FAVORITES,
    CLEAR_USER_FAVORITES,
} from "../actions";


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
};

export const UserProvider = ({ children }) => {
  
  const { openModal } = useGlobalContext();
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
        //dispatch({type: SET_INFO, payload: error.response.data.message});
        openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});
      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        //dispatch({type: SET_INFO, payload: error.message});
        openModal({showModal: true, modalMsg: error.message, modalError: true});
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
        openModal({showModal: true, modalMsg: 'Uspešno kreiran korisnik, sad možete da se ulogujete.', modalError: false});
      }
    } catch (error) {
      if (error.response) {
        //dispatch({type: SET_INFO, payload: error.response.data.message});
        openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});
      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        //dispatch({type: SET_INFO, payload: error.message});
        openModal({showModal: true, modalMsg: error.message, modalError: true});
      }
    }
  }

  const userLogout = async () => {
    try {
      // eslint-disable-next-line
      const {data} = await axios({
        url: '/auth/logout',
        method: 'DELETE',
        withCredentials: true
      });
      
      dispatch({type: SET_USER, payload: false});
      
    } catch (error) {
      if (error.response) {
        //dispatch({type: SET_INFO, payload: error.response.data.message});
        openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});
      } else {
        // u slucaju da nema mreze, a hocemo da se logujemo izbacuje Promise pending
        //dispatch({type: SET_INFO, payload: error.message});
        openModal({showModal: true, modalMsg: error.message, modalError: true});
      }
    }
  }

  const updateUserData = (item) => {
    dispatch({type: UPDATE_USER_FAVORITES, payload: item})
  }

  //obrisi celu favorites listu
  const clearFavoritesList = () => {
    dispatch({type: CLEAR_USER_FAVORITES})
  }

  const fetchUser = userData => {
    state.loginPage ? userLogin(userData) : userRegister(userData);
    }
  // prilikom svake promene usera zapamti promenu u storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));

    // updejtuj podatke na serveru
    const sendFavoritesList = async(newData) => {
      try {
        // eslint-disable-next-line
        const {data} = await axios({
          url: '/auth/updateUser',
          method: 'PUT',
          data: newData,
          withCredentials: true
        })
      } catch (error) {
        console.log(error);
        openModal({showModal: true, modalMsg: 'Greška prilikom slanja podataka na server.', modalError: true});
      }
    } 

    if (state.user) {
      sendFavoritesList(state.user);
    }
  }, [state.user])
    
  return (
      <UserContext.Provider
          value={{
              ...state,
              toggleForm,
              fetchUser,
              userLogout,
              updateUserData,
              clearFavoritesList
          }}
      >
          {children}
      </UserContext.Provider>
  );
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
