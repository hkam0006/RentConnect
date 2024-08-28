import { useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'

import React from 'react'

const RenterRoute = ({Component}) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const isRenter = useSelector(state => state.user.isRenter)
  return (
    (isRenter && isLoggedIn) ? <Component /> : <Navigate to='/' replace />
  )
}

export default RenterRoute