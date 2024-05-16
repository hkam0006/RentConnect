import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationDetails from './components/application_details/ApplicationDetails';
import theme from './theme';
import Properties from './components/property_page/Properties';
import PropertyDetails  from './components/property_page/PropertyDetails';
import Contacts from './components/contacts/Contacts';
import Application from './components/applications/Application';
import Dashboard from './components/dashboard_page/Dashboard';
import PropertyDetailsTenant from './components/property_page/tenant/PropertyDetailsTenant';
import {CssBaseline, ThemeProvider} from "@mui/material";
import PropertySearch from './components/property_search/PropertyGrid';
import RentalProfile from './components/rental_profile/RentalProfile';
import RenterApplication from './components/renter_application/RenterApplication';
import ReceivedApplication from './components/applications/manager/RecievedApplication';
import TenantProperty from './components/property_page/tenant/tenantProperties';

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
            <Route path='/tenantProperty' element={<TenantProperty/>} />
          </Routes>
        </Router>
    </ThemeProvider>
  )
}

function Home() {
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
    </div>

  );
}

export default App;
