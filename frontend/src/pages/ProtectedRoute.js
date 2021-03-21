import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useUserContext} from '../context/user_context';


const ProtectedRoute = ({ children, ...rest }) => {
    const { user } = useUserContext();

    return (
        <Route
            {...rest}
            render={() => {
                return user ? children : <Redirect to="/" />;
            }}
        ></Route>
    );
};
export default ProtectedRoute;
