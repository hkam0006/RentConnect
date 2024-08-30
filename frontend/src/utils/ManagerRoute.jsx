import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ManagerRoute = ({Component}) => {
  const isManager = useSelector(state => state.user.isManager)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  return (
    (isManager && isLoggedIn) ? <Component /> : <Navigate to="/Landing" replace/>
  )
}

export default ManagerRoute;
