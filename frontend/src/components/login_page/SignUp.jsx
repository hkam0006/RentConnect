import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import { Button} from '@mui/material';
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
  return (
    <Box sx={{ml: '35%', mt: '10%', backgroundColor: 'white', width: '30%', mb: '10%', borderRadius: 2}}>
        <br/>
        <Box sx={{fontSize: '220%', fontWeight: 'bold', ml: '7%'}}>Sign Up</Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: "5%"}}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, alignSelf: 'bottom', height: '35px', width: '35px'}} />
            <TextField id='Email' value={email} onChange={handleEmailChange} label='Email' variant='standard' sx={{width: '80%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
        </Box>
        <br/>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: "5%"}}>
            <Lock sx={{ color: 'action.active', mr: 1, my: 0.5, alignSelf: 'bottom', height: '35px', width: '35px'}} />
            <TextField id='Password' value={password} onChange={handlePasswordChange} label='Password' variant='standard' type='password' error={errorTextFlag} helperText={errorTextFlag?errorText:''} sx={{width: '80%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
        </Box>
        <br/>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: "5%"}}>
            <Lock sx={{ color: 'action.active', mr: 1, my: 0.5, alignSelf: 'bottom', height: '35px', width: '35px'}} />
            <TextField id='PasswordConf' value={passwordConf} onChange={handlePasswordConfChange} label='Confirm Password' variant='standard' type='password' error={errorTextFlag} sx={{width: '80%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
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