import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useUserContext} from '../context/user_context'

const IsUserAdmin = ({children, ...rest}) => {
    const {user} = useUserContext();

    return (
        <Route
            {...rest}
            render={() =>
                user?.role !== "admin" ? (
                    children
                ) : (
                    <Redirect to="/admin" />
                )
            }
        />
    );
}

export default IsUserAdmin;