import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationDetails from './components/applications/ApplicationDetails';
import './App.css';
import theme from './theme';
import Properties from './components/property_page/Properties';
import PropertyDetails  from './components/property_page/PropertyDetails';
import Contacts from './components/contacts/Contacts';

import {CssBaseline, ThemeProvider} from "@mui/material"

function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ApplicationDetails/:applicationId' element={<ApplicationDetails />} />
            <Route path='/property' element={<Properties />} />
            <Route path='/property/:propertyId' element={<PropertyDetails />} />
          </Routes>
        </Router>
    </ThemeProvider>
  )
}

function Home() {
  return (
    <div>
      <Link to="/ApplicationDetails/testID">
        <button>Go to ApplicationDetails with ID "testID"</button>
      </Link>
      <Link to="/property">
        <button>Go to Properties</button>
      </Link>
      <Link to="/PropertyDetails">
        <button>Go to Property Details</button>
      </Link>
    </div>
    
  );
}

export default App;
