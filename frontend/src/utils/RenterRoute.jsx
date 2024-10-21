import { useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'
import RouteRedirect from './RouteRedirect'

import React from 'react'

const RenterRoute = ({Component}) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const isRenter = useSelector(state => state.user.isRenter);
  return (
    (isRenter && Boolean(currentUser)) ? <Component /> :  <RouteRedirect Component={Component} type="renter"/>
  )
}

export default RenterRoute