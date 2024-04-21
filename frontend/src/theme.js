import {createTheme} from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F2F2F2"
    },
    primary: {
      main: "#5c4db1"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face {
        font-family: "Lato, sans-serif";
        src: url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
      }`
    }
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    button: {
      textTransform: "unset",
      fontWeight: 700
    }
  }
})

export default theme