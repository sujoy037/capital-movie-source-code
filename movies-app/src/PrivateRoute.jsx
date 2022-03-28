import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ element: Component, is_login, user, ...props }) => {
  if (!is_login) return window.location.replace("/login");
  return <Route {...props} element={<Component user={user}  />} />;
};

export default PrivateRoute;
