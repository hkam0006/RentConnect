import { useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'

import React from 'react'

const RenterRoute = ({Component}) => {
  const isLoggedIn = useSelector(state => state.user.currentUser)
  const isRenter = useSelector(state => state.user.isRenter)
  return (
    (isRenter && Boolean(isLoggedIn)) ? <Component /> : <Navigate to='/Landing' replace />
  )
}

export default RenterRoute