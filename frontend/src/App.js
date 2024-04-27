import './App.css';
import Contacts from './components/contacts/Contacts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
