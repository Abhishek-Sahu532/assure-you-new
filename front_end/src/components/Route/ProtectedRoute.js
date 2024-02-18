import React from "react";

import {Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, isAuthenticated}) => {

  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }

  if(!isAuthenticated && !isAdmin){
    return <Navigate to={'/'}/>
  }
// if(isAuthenticated && isAdmin){
  return < Outlet />
// }




}


export default ProtectedRoute;