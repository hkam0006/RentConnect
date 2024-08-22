import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationDetails from './manager-components/application_details/ApplicationDetails';
import theme from './theme';
import Properties from './manager-components/property_page/Properties';
import PropertyDetails  from './manager-components/property_page/PropertyDetails';
import Contacts from './manager-components/contacts/Contacts';
import Application from './manager-components/applications/Application';
import Dashboard from './manager-components/dashboard_page/Dashboard';
import PropertyDetailsTenant from './renter-components/property_page/PropertyDetailsTenant';
import {CssBaseline, ThemeProvider} from "@mui/material";
import PropertySearch from './manager-components/property_search/PropertyGrid';
import RentalProfile from './manager-components/rental_profile/RentalProfile';
import RenterApplication from './renter-components/renter_application/RenterApplication';
import ReceivedApplication from './manager-components/applications/manager/RecievedApplication';
import LogIn from './manager-components/login_page/Login';
import Inspection from './manager-components/inspection_page/Inspection';
import Messaging from './manager-components/messaging/Messaging'
import Keys from './manager-components/keys/Keys';
import InspectionRun from './manager-components/inspection_run/InspectionRun'
import SignUp from './manager-components/login_page/SignUp';
import RenterHome from './renter-components/renter_home/RenterHome';
import RenterRoute from './utils/RenterRoute';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setManager, setRenter } from './utils/UserSlice';
import ManagerRoute from './utils/ManagerRoute';
import LandingPage from './public-components/LandingPage';
import PublicPropertyPage from './public-components/PublicPropertyPage';


function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='Application' element={<Application />} />
            <Route path='/ApplicationDetails/:companyId/:propertyId/:renterId' element={<ApplicationDetails />} />
            <Route path='/property' element={<Properties />} />
            <Route path='/property/:propertyId' element={<PropertyDetails />} />
            <Route path='/contacts' element={<Contacts />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/RentalProfile' element={<RentalProfile />}></Route>
            <Route path='/tenant/property/:propertyId' element={<PropertyDetailsTenant />} />
            <Route path='/search' element={<PropertySearch />} />
            <Route path='/renterapplication' element={<RenterApplication />} />
            <Route path='/MyApplication' element={<ReceivedApplication />} />
            <Route path='/LogIn' element={<LogIn/>} />
            <Route path='/Inspection' element={<Inspection/>} />
            <Route path='/messages' element={<Messaging/>} />
            <Route path='/keys' element={<Keys/>} />
            <Route path='/InspectionRun' element={<InspectionRun/>} />
            <Route path='/SignUp' element={<SignUp/>} />
            <Route path='/RenterHome' element={<RenterHome/>} />
            <Route path='/ProtectedRenterHome' element={<RenterRoute Component={RenterHome}/>} />
            <Route path='/ProtectedManagerHome' element={<ManagerRoute Component={Dashboard}/>} />
            <Route path='/Landing' element={<LandingPage/>} />
            <Route path='/LandingSearch' element={<PublicPropertyPage />}/>
          </Routes>
        </Router>
    </ThemeProvider>
  )
}

function Home() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const isRenter = useSelector(state => state.user.isRenter)
  const isManager = useSelector(state => state.user.isManager)

  const dispatch = useDispatch();
  
  return (
    <div>
      <Link to="/Application">
        <button>Go to Applications Page</button>
      </Link>
      <Link to="/ApplicationDetails/1b9500a6-ac39-4c6a-971f-766f85b41d78/cf96fd08-1903-4a93-95a9-51c675f9ff41/66de5be5-e19c-4495-9442-a089eff74af2">
        <button>Go to ApplicationDetails</button>
      </Link>
      <Link to="/property">
        <button>Go to Properties</button>
      </Link>
      <Link to="/property/testID">
        <button>Go to Property Details</button>
      </Link>
      <Link to="/contacts">
        <button>Go to Contacts</button>
      </Link>
      <Link to="/dashboard">
        <button>Go to Dashboard</button>
      </Link>
      <Link to="/tenant/property/testID">
        <button>Go to Tenant Property Details</button>
      </Link>
      <Link to="/RentalProfile">
        <button>Go to Rental Profile</button>
      </Link>
        <Link to="/renterapplication">
            <button>Go to Renter Application</button>
        </Link>
        <Link to="/MyApplication">
            <button>Go to My Application</button>
        </Link>
        <Link to="/LogIn">
            <button>Go to Log In</button>
        </Link>
        <Link to="/Inspection">
            <button>Go to Inspection</button>
        </Link>
        <Link to="/InspectionRun">
            <button>Go to Inspection Runs</button>
        </Link>
        <Link to="/RenterHome">
            <button>Go to Renter Homepage</button>
        </Link>
        <br />
        <br />
        <h3>
          Logged In: {isLoggedIn ? "true" : "false"} 
          <button onClick={() => dispatch(login())}>Sign In</button>
          <button onClick={() => dispatch(logout())}>Sign Out</button>
        </h3>
        <h3>
          Is Renter: {isRenter ? "true" : "false"} 
          <button onClick={() => dispatch(setRenter())}>Set Renter</button>
        </h3>
        <h3>Is Manager: {isManager ? "true" : "false"} 
        <button onClick={() => dispatch(setManager())}>Set Manager</button>
        </h3>
        <Link to="/ProtectedRenterHome">
            <button>Go to Protected Renter Home</button>
        </Link>
        <Link to="/ProtectedManagerHome">
            <button>Go to Protected Manager Home</button>
        </Link>
    </div>

  );
}

export default App;
