import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, FormControlLabel, hexToRgb, Switch, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../supabase";
import { useState} from 'react';
import useGetKeyByCompanyNames from '../../queries/Company/useGetCompanyNames';



function AccountSetUpPM(){
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

    const { fetchCompanies } = useGetKeyByCompanyNames();
    const [companies, setCompanies] = useState([]);
    React.useEffect(() => {
        (async () => {
            const {data, error} = await fetchCompanies();
            var companies = [];
            data.forEach(company => {
                companies.push(company.company_name);
            });
            setCompanies(companies);
        })();
    }, []);

    const [newCompanyFlag, setNewCompanyFlag] = useState(false);
    const handleNewCompanyFlagChange = f => {
        setNewCompanyFlag(f.target.checked);
    }

    const [newCompanyName, setNewCompanyName] = useState('');
    const handleNewCompanyNameChange = f => {
        setNewCompanyName(f.target.value);
    }

    const [companyName, setCompanyName] = useState('');
    const handleCompanyNameChange = f => {
        setCompanyName(f.target.value);
    }

    const [companyNameErrorTextFlag, setCompanyNameErrorTextFlag] = useState(false);

    const handleAccountCreation = () => {
        
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
                    sx={{width: '96%', ml: '2%'}} 
                    inputProps={{sx: {height: '15%', fontSize: '130%'}}} 
                    InputLabelProps={{sx: {fontSize: '130%'}}}/>
            </Box>
        </Box>
        <br/>
        <Typography sx={{color: 'primary.main', ml: "4%", width: '90%'}}>Company Details</Typography>
        <Box sx={{border: 1, borderRadius: 2, borderColor: 'primary.main', ml: "4%", width: '90%'}}>
            <FormControlLabel 
                control={<Switch checked={newCompanyFlag} 
                onChange={handleNewCompanyFlagChange}/>} 
                label="Set Up New Company" 
                sx={{mt: '1%', ml:'2%'}}/>
            {!newCompanyFlag?
            <Autocomplete 
                disablePortal 
                id="company" 
                options={companies} 
                sx={{width: '96%', ml: '2%', mt: '1%', mb: '3%'}} 
                renderInput={(params) => 
                    <TextField 
                        {...params} 
                        label="Company Name" 
                        variant='standard' 
                        InputLabelProps={{sx: {fontSize: '130%'}}} 
                        value={companyName} 
                        onChange={handleCompanyNameChange}/>}/>
            : 
            <TextField 
                id='NewCompanyName' 
                value={newCompanyName} 
                onChange={handleNewCompanyNameChange} 
                label='Company Name' 
                variant='standard' 
                sx={{width: '96%', ml: '2%', mb: '3%', mt: '1%'}} 
                inputProps={{sx: {height:'0%', fontSize: '130%'}}} 
                InputLabelProps={{sx: {fontSize: '130%'}}}/>
            }
        </Box>
        <br/>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" onClick={handleAccountCreation}>Create Account</Button>
        </Box>
        <br/>
    </Box>
  );
}

export default AccountSetUpPM;