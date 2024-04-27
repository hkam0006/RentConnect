<<<<<<< HEAD
import './App.css';
import Contacts from './components/contacts/Contacts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationDetails from './components/applications/ApplicationDetails';
import './App.css';
import theme from './theme';
import Properties from './components/property_page/Properties';
import PropertyDetails  from './components/property_page/PropertyDetails';

import {CssBaseline, ThemeProvider} from "@mui/material"
>>>>>>> b3363acd25fd2726de06c199cce6094ed4bcdcaa

function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ApplicationDetails/:applicationId' element={<ApplicationDetails />} />
            <Route path='/Properties' element={<Properties />} />
            <Route path='/PropertyDetails' element={<PropertyDetails />} />
          </Routes>
        </Router>
    </ThemeProvider>
  )
}

function Home() {
  return (
<<<<<<< HEAD
    <Router>
      <main>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
    </Router>
=======
    <div>
      <Link to="/ApplicationDetails/testID">
        <button>Go to ApplicationDetails with ID "testID"</button>
      </Link>
      <Link to="/Properties">
        <button>Go to Properties</button>
      </Link>
      <Link to="/PropertyDetails">
        <button>Go to Property Details</button>
      </Link>
    </div>
    
>>>>>>> b3363acd25fd2726de06c199cce6094ed4bcdcaa
  );
}

export default App;
