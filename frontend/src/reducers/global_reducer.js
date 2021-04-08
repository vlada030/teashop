import {SIDEBAR_OPEN, SIDEBAR_CLOSE, HIDE_MODAL} from '../actions';

const globalReducer = (state, action) => {
    switch(action.type) {
        case SIDEBAR_OPEN: {
            return {...state, isSidebarOpen: true}
        }

        case SIDEBAR_CLOSE: {
            return {...state, isSidebarOpen: false}
        }

        case HIDE_MODAL: {
            return {...state, showModal: false, modalMsg: ''}
        }

        default: throw new Error(`U globalnom reduceru ne postoji action type ${action.type}`)
    }


}

export default globalReducer;