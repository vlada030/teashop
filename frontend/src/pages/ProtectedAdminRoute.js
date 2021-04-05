import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const ProtectedAdminRoute = ({children, ...rest}) => {

    const {user} = useUserContext();

    // return <Route {...rest} >
    //         {user && user.role === 'admin' ? children : <Redirect to='/' />}
    //         </Route>

    return <Route {...rest} render={() => user && user.role === 'admin' ? children : <Redirect to='/' />}></Route>
}

export default ProtectedAdminRoute;