import './App.css';
import theme from './theme';
import Property from './components/property_page/Property';

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
