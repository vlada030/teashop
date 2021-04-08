import React, {useContext, useReducer} from 'react';
import { SIDEBAR_OPEN, SIDEBAR_CLOSE, HIDE_MODAL } from "../actions";
import reducer from '../reducers/global_reducer';

const initialState = {
    isSidebarOpen: false,
    showModal: true,
    modalMsg: '',
    modalError: true
}

const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN});
    }

    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE});
    }

    // const showModal = () => {
    //     dispatch({type: SHOW_MODAL});
    // }

    const closeModal = () => {
        dispatch({type: HIDE_MODAL});
    }

    return (
        <GlobalContext.Provider value={{ ...state, openSidebar, closeSidebar, closeModal }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}