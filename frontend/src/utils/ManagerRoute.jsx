import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import RouteRedirect from './RouteRedirect'

const ManagerRoute = ({Component}) => {
  const isManager = useSelector(state => state.user.isManager)
  const currentUser = useSelector(state => state.user.currentUser)
  return (
    (isManager && Boolean(currentUser)) ? <Component /> : <RouteRedirect Component={Component} type="manager"/>
  )
}

export default ManagerRoute;
