import React, {useContext, useReducer} from 'react';
import {SIDEBAR_OPEN, SIDEBAR_CLOSE} from '../actions';
import reducer from '../reducers/global_reducer';

const initialState = {
    isSidebarOpen: false,
    showModal: false,
    modalMsg: ''
}

const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN})
    }

    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }

    return (
        <GlobalContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}