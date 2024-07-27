import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import { Button, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

async function AttemptSignIn(email, password){
    const { user, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
}

function LogIn(){
    const [username, setUsername] = useState('');
    const handleUsernameChange = f => {
        setUsername(f.target.value);
    }
    const [password, setPassword] = useState('');
    const handlePasswordChange = f => {
        setPassword(f.target.value);
    }
  return (
    <Box sx={{ml: '35%', mt: '10%', backgroundColor: 'white', width: '30%', mb: '10%', borderRadius: 2}}>
        <br/>
        <Box sx={{fontSize: '220%', fontWeight: 'bold', ml: '7%'}}>Log In</Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: "5%"}}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, alignSelf: 'bottom', height: '35px', width: '35px'}} />
            <TextField id='Username' value={username} onChange={handleUsernameChange} label='Username' variant='standard' sx={{width: '80%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: "5%"}}>
            <Lock sx={{ color: 'action.active', mr: 1, my: 0.5, alignSelf: 'bottom', height: '35px', width: '35px'}} />
            <TextField id='Password' value={password} onChange={handlePasswordChange} label='Password' variant='standard' type='password' sx={{width: '80%'}} inputProps={{sx: {height: '15%', fontSize: '130%'}}} InputLabelProps={{sx: {fontSize: '130%'}}}/>
        </Box>
        <br/>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" onClick={AttemptSignIn}>Sign In</Button>
        </Box>
        <br/>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{mr:'2%'}}>Don't have an account?</Box>
            <Link to="/SignUp">Sign Up</Link>
        
        </Box>
        <br/>
    </Box>
  );
}

export default LogIn;