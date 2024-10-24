import { useSelector } from 'react-redux'
import RouteRedirect from './RouteRedirect'

const ManagerRoute = ({Component}) => {
  const isManager = useSelector(state => state.user.isManager);
  const currentUser = useSelector(state => state.user.currentUser);
  const companyId = useSelector((state) => state.user.currentUser?.company_id);
  return (
    (isManager && Boolean(currentUser) && Boolean(companyId)) ? <Component /> : <RouteRedirect Component={Component} type="manager"/>
  )
}

export default ManagerRoute;
