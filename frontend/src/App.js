import './App.css';
import theme from './theme';
import Dashboard from './components/dashboard_page/Dashboard';

import {CssBaseline, ThemeProvider} from "@mui/material"

function App() {
  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Dashboard />
    </ThemeProvider>
  </>
}

export default App;
