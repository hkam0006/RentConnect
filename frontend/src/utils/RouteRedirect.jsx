import { useSelector } from 'react-redux'
import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteRedirect = ({Component, type}) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const isManager = useSelector(state => state.user.isManager);
  const isRenter = useSelector(state => state.user.isRenter);
  const companyId = useSelector((state) => state.user.currentUser?.company_id);
  const loggedIn = Boolean(currentUser);
  const hasCompany = Boolean(companyId);
  if (!loggedIn){
    return <Navigate to="/Landing" replace/>;
  }
  switch (type){
    case "manager":
      if (isManager && !hasCompany){
        return <Navigate to='/waiting_for_company' replace/>;
      }
      else if (isRenter){
        return <Navigate to="/RenterHome" replace/>;
      }
      else{
        return <Component />;
      }
    case "renter":
      if (isManager && hasCompany){
        return <Navigate to="/dashboard" replace/>;
      }
      else if (isManager && !hasCompany){
        return <Navigate to='/waiting_for_company' replace/>;
      }
      else{
        return <Component />;
      }
    case "manager without company":
      if (isManager && hasCompany){
        return <Navigate to="/dashboard" replace/>;
      }
      else if (isRenter){
        return <Navigate to="/RenterHome" replace/>;
      }
      else{
        return <Component />;
      }
    default:
      return <Navigate to='/Landing' replace/>;
  }
}

export default RouteRedirect
