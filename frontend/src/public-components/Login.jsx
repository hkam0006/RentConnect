import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Grid,
  FormControlLabel,
  Typography,
  Avatar,
  Paper,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import useGetAccountTypeByUUID from "../queries/Account Setup/useGetAccountTypeByUUID";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        RentConnect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function LogIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(false);
  const navigate = useNavigate();
  const fetchAccountSetup = useGetAccountTypeByUUID();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (f) => setRememberMe(f.target.checked);
  const handleEmailChange = (f) => setEmail(f.target.value);
  const handlePasswordChange = (f) => setPassword(f.target.value);

  const attemptLogIn = (e) => {
    e.preventDefault();
    setLoading(true);

    supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then(async (data) => {
        setLoading(false);
        if (!data.error) {
          const user = data.data.user;
          var account_type = await fetchAccountSetup(data.data.user.id);

          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            sessionStorage.setItem("user", JSON.stringify(user));
          }

          if (account_type.data[0]) {
            switch (account_type.data[0].account_type) {
              case "Property Manager":
                navigate("/AccountSetUpPM");
                break;
              case "Renter":
                navigate("/AccountSetUpR");
                break;
              default:
                console.log("Invalid account type found");
                return;
            }
          } else {
            navigate("/dashboard");
          }
        } else {
          setErrorText(true);
          setPassword("");
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorText(true);
        setPassword("");
        console.log(error);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundColor: "#4158D0",
          backgroundImage:
            "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "80%",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={attemptLogIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/SignUp" href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LogIn;
