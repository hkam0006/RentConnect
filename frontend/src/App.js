import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ApplicationDetails from './components/applications/ApplicationDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/ApplicationDetails/:applicationId' element={<ApplicationDetails />} />
        {/* Route for the button */}
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <Link to="/ApplicationDetails/testID">
        <button>Go to ApplicationDetails with ID "testID"</button>
      </Link>
    </div>
  );
}

export default App;
