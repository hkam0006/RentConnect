import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import { Button, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../supabase";
import { useState} from 'react';

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
    const [errorTextFlag, setErrorTextFlag] = useState(false);
    const [errorText, setErrorText] = useState(false);
    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const handleFnameChange = f => {
        setFname(f.target.value);
    }

    const [lname, setLname] = useState('');
    const handleLnameChange = f => {
        setLname(f.target.value);
    }

    const [phoneNum, setPhoneNum] = useState('');
    const handlePhoneNumChange = f => {
        if (!Number.isNaN(Number(f.target.value))){
            setPhoneNum(f.target.value);
        }
    }
    // <Typography sx={{height: '15%', fontSize: '130%', mr: '2%'}}>Email:</Typography>
  return (
    <Box sx={{ml: '30%', mt: '5%', backgroundColor: 'white', width: '40%', borderRadius: 2}}>
        <br/>
        <Box sx={{fontSize: '220%', fontWeight: 'bold', textAlign: 'center'}}>Sign Up</Box>
        <br/>
        <Typography sx={{color: 'primary.main', ml: "4%", width: '90%'}}>Account Details</Typography>
        <Box sx={{border: 1, borderRadius: 2, borderColor: 'primary.main', ml: "4%", width: '90%'}}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField id='FName' value={fname} onChange={handleFnameChange} label='First Name' variant='standard' sx={{width: '96%', ml: '2%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                <TextField id='LName' value={lname} onChange={handleLnameChange} label='Last Name' variant='standard'  sx={{width: '96%', ml: '2%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: '4%'}}>
                <TextField id='P' value={phoneNum} onChange={handlePhoneNumChange} label='Phone Number' variant='standard'  sx={{width: '96%', ml: '2%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
        </Box>
        <br/>
        <Typography sx={{color: 'primary.main', ml: "4%", width: '90%'}}>Log In Details</Typography>
        <Box sx={{border: 1, borderRadius: 2, borderColor: 'primary.main', ml: "4%", width: '90%'}}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField id='Email' value={email} onChange={handleEmailChange} label='Email' variant='standard' sx={{width: '96%', ml: '2%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                
                <TextField id='Password' value={password} onChange={handlePasswordChange} label='Password' variant='standard' type='password' error={errorTextFlag} helperText={errorTextFlag?errorText:''} sx={{width: '96%', ml: '2%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: '4%'}}>
                
                <TextField id='PasswordConf' value={passwordConf} onChange={handlePasswordConfChange} label='Confirm Password' variant='standard' type='password' error={errorTextFlag} sx={{width: '96%', ml: '2%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
        </Box>
        <br/>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" onClick={() => {
                if (password != passwordConf){   
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
                    supabase.auth.signUp({
                        email: email,
                        password: password,
                      }).then(data=> {
                        if (!data.error){
                            navigate('/dashboard');
                        }
                        else{
                            setErrorText('Account already exists')
                            setErrorTextFlag(true);
                            setPassword('');
                            setPasswordConf('');
                        }
                    })
                    .catch(error => {
                        setErrorText(`Unhandled error: ${error}`)
                        setErrorTextFlag(true);
                        setPassword('');
                        setPasswordConf('');
                        console.log(error);
                    })
                }
            }}>Create Account</Button>
        </Box>
        <br/>
    </Box>
  );
}

export default SignUp;