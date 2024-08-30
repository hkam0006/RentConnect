import { useSelector } from 'react-redux'
import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteRedirect = ({Component, type}) => {
  const currentUser = useSelector(state => state.user.currentUser)
  const isManager = useSelector(state => state.user.isManager)
  const isRenter = useSelector(state => state.user.isRenter)
  const loggedIn = Boolean(currentUser)
  return (
    !loggedIn ? <Navigate to="/Landing" replace/> : (
      (type === "manager" && isManager) ? <Component /> : (
        (type === "renter" && isRenter) ? <Component /> : (
          isManager ? <Navigate to="/dashboard" replace/> : <Navigate to="/RenterHome" replace/>
        )
      )
    )
  )
}

export default RouteRedirect
