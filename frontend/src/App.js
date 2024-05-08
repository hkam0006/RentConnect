import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationDetails from './components/applications/ApplicationDetails';
import theme from './theme';
import Properties from './components/property_page/Properties';
import PropertyDetails  from './components/property_page/PropertyDetails';
import Contacts from './components/contacts/Contacts';
import Application from './components/applications/Application';
import Dashboard from './components/dashboard_page/Dashboard';
import PropertyDetailsTenant from './components/property_page/tenant/PropertyDetailsTenant'
import {CssBaseline, ThemeProvider} from "@mui/material"
import PropertySearch from './components/property_search/PropertyGrid';
import PropertyList from './components/bookmarked_properties/propertyList';


function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='Application' element={<Application />} />
            <Route path='/ApplicationDetails/:applicationId' element={<ApplicationDetails />} />
            <Route path='/property' element={<Properties />} />
            <Route path='/property/:propertyId' element={<PropertyDetails />} />
            <Route path='/contacts' element={<Contacts />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/tenant/property/:propertyId' element={<PropertyDetailsTenant />} />
            <Route path='/search' element={<PropertySearch />} />
            <Route path='/PropertyList' element={<PropertyList />} />
          </Routes>
        </Router>
    </ThemeProvider>
  )
}

function Home() {
  return (
    <div>
      <Link to="/Application">
        <button>Go to Applications Page"</button>
      </Link>
      <Link to="/ApplicationDetails/testID">
        <button>Go to ApplicationDetails with ID "testID"</button>
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
      <Link to="/PropertyList">
          <button>Go to property lists</button>
      </Link>
    </div>

  );
}

export default App;
