import React from "react";
import { Route, Redirect } from "react-router-dom";
// will remove later
import { useUserContext } from "../context/user_context";

const ProtectedRoute = ({ children, ...rest }) => {
    const { customer } = useUserContext();

    return (
        <Route
            {...rest}
            render={() => {
                return customer ? children : <Redirect to="/" />;
            }}
        ></Route>
    );
};
export default ProtectedRoute;
