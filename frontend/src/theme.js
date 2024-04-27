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
  typography: {
    fontFamily: 'Roboto, sans serif',
    button: {
      textTransform: "unset",
      fontWeight: 700
    }
  }
})

export default theme