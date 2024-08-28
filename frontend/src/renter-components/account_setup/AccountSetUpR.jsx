import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import useDeleteAccountSetUp from '../../mutators/Account SetUp/useDeleteAccountSetUp';
import { supabase } from '../../supabase';
import useAddRenter from '../../mutators/Renter/useAddRenter';

function AccountSetUpR(){
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    React.useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) =>{
                if (value.data?.user) {
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);

    const [fname, setFname] = useState('');
    const [fnameErrorFlag, setFnameErrorFlag] = useState(false);
    const handleFnameChange = f => {
        setFname(f.target.value);
        setFnameErrorFlag(false);
    }

    const [lname, setLname] = useState('');
    const [lnameErrorFlag, setLnameErrorFlag] = useState(false);
    const handleLnameChange = f => {
        setLname(f.target.value);
        setLnameErrorFlag(false);
    }

    const [phoneNum, setPhoneNum] = useState('');
    const [phoneNumErrorFlag, setPhoneNumErrorFlag] = useState(false);
    const handlePhoneNumChange = f => {
        if (!Number.isNaN(Number(f.target.value))){
            setPhoneNum(f.target.value);
            setPhoneNumErrorFlag(false);
        }
    }

    const { deleteAccountSetUp } = useDeleteAccountSetUp();
    const { addRenter } = useAddRenter();

    const handleAccountCreation = async () => {
        var anyError = false;
        if (fname === ''){
            setFnameErrorFlag(true);
            anyError = true;
        }
        if (lname === ''){
            setLnameErrorFlag(true);
            anyError = true;
        }
        if (phoneNum === ''){
            setPhoneNumErrorFlag(true);
            anyError = true;
        }
        if (!anyError){
            await deleteAccountSetUp(user.id);
            await addRenter(user.id, user.email, fname, lname, phoneNum);
            navigate('/dashboard');
        }
    }

  return (
    <Box sx={{ml: '30%', mt: '1%', backgroundColor: 'white', width: '40%', borderRadius: 2}}>
        <br/>
        <Box sx={{fontSize: '220%', fontWeight: 'bold', textAlign: 'center'}}>Account Set Up</Box>
        <Typography sx={{color: 'primary.main', ml: "4%", width: '90%'}}>Account Details</Typography>
        <Box sx={{border: 1, borderRadius: 2, borderColor: 'primary.main', ml: "4%", width: '90%'}}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField 
                    id='FName'
                    value={fname} 
                    onChange={handleFnameChange} 
                    label='First Name' 
                    variant='standard' 
                    error={fnameErrorFlag}
                    sx={{width: '96%', ml: '2%'}} 
                    inputProps={{sx: {height: '15%', fontSize: '130%'}}} 
                    InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                <TextField 
                    id='LName' 
                    value={lname} 
                    onChange={handleLnameChange} 
                    label='Last Name' 
                    variant='standard'  
                    error={lnameErrorFlag}
                    sx={{width: '96%', ml: '2%'}} 
                    inputProps={{sx: {height: '15%', fontSize: '130%'}}} 
                    InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: '4%'}}>
                <TextField 
                    id='PhoneNum' 
                    value={phoneNum} 
                    onChange={handlePhoneNumChange} 
                    label='Phone Number'
                    variant='standard'  
                    error={phoneNumErrorFlag}
                    sx={{width: '96%', ml: '2%'}} 
                    inputProps={{sx: {height: '15%', fontSize: '130%'}}} 
                    InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
        </Box>
        <br/>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" onClick={handleAccountCreation}>Create Account</Button>
        </Box>
        <br/>
    </Box>
  );
}

export default AccountSetUpR;