import {SIDEBAR_OPEN, SIDEBAR_CLOSE} from '../actions';

const globalReducer = (state, action) => {
    switch(action.type) {
        case SIDEBAR_OPEN: {
            return {...state, isSidebarOpen: true}
        }

        case SIDEBAR_CLOSE: {
            return {...state, isSidebarOpen: false}
        }
    }

    throw new Error(`U globalnom reduceru ne postoji action type ${action.type}`)

}

export default globalReducer;