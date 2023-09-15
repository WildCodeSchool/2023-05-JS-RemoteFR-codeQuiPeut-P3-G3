import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedUserRoute = () => {
  const isLoggedIn = !!Cookies.get("authToken")
  if (isLoggedIn) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}

export default ProtectedUserRoute
