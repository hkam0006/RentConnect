import './App.css';
import theme from './theme';
import Property from './components/property_page/Properties';
import PropertyDetails  from './components/property_page/PropertyDetails';

import {CssBaseline, ThemeProvider} from "@mui/material"

function App() {
  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Property />
    </ThemeProvider>
  </>
}

export default App;
