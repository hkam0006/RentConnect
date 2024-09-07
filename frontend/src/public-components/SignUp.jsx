import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Typography, Avatar, Paper}  from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { supabase } from "../supabase";
import { useState} from 'react';
import useAddAccountSetUp from '../mutators/Account SetUp/useAddAccountSetUp';

function SignUp(){
    const [email, setEmail] = useState('');
    const handleEmailChange = f => {
        setEmail(f.target.value);
    }
    const [password, setPassword] = useState('');
    const handlePasswordChange = f => {
        setPassword(f.target.value);
    }
    const [passwordConf, setPasswordConf] = useState('');
    const handlePasswordConfChange = f => {
        setPasswordConf(f.target.value);
    }
    
    const [accountType, setAccountType] = useState('');
    const [accountTypeChosen, setAccountTypeChosen] = useState(false);
    const [signUpComplete, setSignUpComplete] = useState(false);
    const [errorTextFlag, setErrorTextFlag] = useState(false);
    const [errorText, setErrorText] = useState(false);

    const {addAccountSetUp} = useAddAccountSetUp();

    const handleSelectPM = () => {
        setAccountType('Property Manager');
        setAccountTypeChosen(true);
    }

    const handleSelectR = () => {
        setAccountType('Renter');
        setAccountTypeChosen(true);
    }

    const handleAccountCreation = async () => {
        if (password !== passwordConf){   
            setErrorText('Passwords must match')
            setErrorTextFlag(true);
            setPassword('');
            setPasswordConf('');
            return
        }
        var valid = false
        if (password.length > 7){
            var contains_numbers = false;
            var contains_caps = false;
            var contains_special = false;
            let numbers = '1234567890';
            let caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let special = '!@#$%^&*()-_=+[{]}|:;,<.>/?'
            for (var i = 0; i < password.length; i++){
                if (!contains_numbers && numbers.includes(password[i])){ 
                    contains_numbers = true;
                } 
                else{
                    if (!contains_caps && caps.includes(password[i])){ 
                        contains_caps = true;
                    } 
                    else{
                        if (!contains_special && special.includes(password[i])){
                            contains_special = true;
                        }
                    } 
                } 
            }
            if(contains_numbers && contains_caps && contains_special){
                valid = true
            }
        }
        if(!valid){
            setErrorText('Passwords must be 8 characters or more, contain a capital, number and a special character')
            setErrorTextFlag(true);
            setPassword('');
            setPasswordConf('');
            return;
        }
        else{
            const {data,error} =  await supabase.auth.signUp({
                email: email,
                password: password
            });
            if (error){
                setErrorText('Account already exists')
                setErrorTextFlag(true);
                setPassword('');
                setPasswordConf('');
            }
            else{
                addAccountSetUp(data.user.id, accountType); 
                setSignUpComplete(true);
            }
        }
    }
    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              RentConnect
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
  return (
    <Box>
        <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundColor: "#4158D0",
            backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: "80%",
                justifyContent: "center"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              {signUpComplete? 
              <Box>
                <Typography variant='h2'>
                    Please Confirm Email
                </Typography>
                <Typography variant='h6' sx={{textAlign:'center'}}>
                    We sent an email to your inbox
                </Typography>

              </Box>
              :
              <Box>
                {!accountTypeChosen?
                <Box sx={{ mt: 1 }}>
                    <Typography component="h2" variant="h6" sx={{textAlign:'center'}}>
                        Select Account Type
                    </Typography>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSelectR}
                    >
                    Renter
                    </Button>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSelectPM}
                    >
                    Property Manager
                    </Button>
                </Box>
                :
                <Box sx={{ mt: 1 }} >
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
                    error={errorTextFlag}
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
                    error={errorTextFlag}
                    helperText={errorTextFlag?errorText:''}
                    onChange={handlePasswordChange}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConf"
                    label="Confirm Password"
                    type="password"
                    id="passwordConf"
                    autoComplete="current-password"
                    value={passwordConf}
                    error={errorTextFlag}
                    onChange={handlePasswordConfChange}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleAccountCreation}
                    >
                    Create Account
                    </Button>
                </Box>}
              </Box>}
              <Copyright sx={{ mt: 5 }} />
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUp;