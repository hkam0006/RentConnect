import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationDetails from './components/applications/ApplicationDetails';
import './App.css';
import theme from './theme';
import Properties from './components/property_page/Properties';
import PropertyDetails  from './components/property_page/PropertyDetails';

import {CssBaseline, ThemeProvider} from "@mui/material"

function App() {
  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Properties />
    </ThemeProvider>
  </>
}

export default App;
