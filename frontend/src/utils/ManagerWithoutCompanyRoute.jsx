import { useSelector } from 'react-redux'
import RouteRedirect from './RouteRedirect'

const ManagerWithoutCompanyRoute = ({Component}) => {
  const isManager = useSelector(state => state.user.isManager);
  const currentUser = useSelector(state => state.user.currentUser);
  const companyId = useSelector((state) => state.user.currentUser?.company_id);

  return (
    (isManager && Boolean(currentUser) && !Boolean(companyId)) ? <Component /> : <RouteRedirect Component={Component} type="manager without company"/>
  )
}

export default ManagerWithoutCompanyRoute;
