import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

function ProtectedRoutes() {
  const isLoggedIn = !!Cookies.get("authToken")
  const loggedInUserCookie = Cookies.get("loggedInUser")
  const user = loggedInUserCookie
    ? JSON.parse(Cookies.get("loggedInUser"))
    : null
  const isAdmin = user && user.role === "admin"

  if (isLoggedIn && isAdmin) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}

export default ProtectedRoutes
