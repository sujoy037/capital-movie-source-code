import React from 'react'
import { Route, useNavigate, Navigate } from 'react-router-dom'

function LoginRoute({ element: Component, user, ...rest }) {
    console.log(user);

    return (
        user ?
            <Navigate to={"/discover"} />
            :
            <Route
                {...rest}
                element={<Component />}
            />
    )
}

export default LoginRoute