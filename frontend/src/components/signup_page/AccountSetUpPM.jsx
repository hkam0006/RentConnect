import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, FormControlLabel, Switch, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import useGetKeyByCompanyNames from '../../queries/Company/useGetCompanyNames';
import useDeleteAccountSetUp from '../../mutators/Account SetUp/useDeleteAccountSetUp';
import useAddCompany from '../../mutators/Company/useAddCompany';
import useGetCompanyByName from '../../queries/Company/useGetCompanyByName';
import useAddPropertyManager from '../../mutators/Property Manager/useAddPropertyManager';
import { supabase } from '../../supabase';



function AccountSetUpPM(){
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

    const [companyIndex, setCompanyIndex] = useState(-1);
    const [companyNameErrorFlag, setCompanyIndexErrorFlag] = useState(false);
    const handleCompanyNameChange = f => {
        setCompanyIndex(f.target.value);
        setCompanyIndexErrorFlag(false);
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
    const [newCompanyNameErrorFlag, setNewCompanyNameErrorFlag] = useState(false);
    const handleNewCompanyNameChange = f => {
        setNewCompanyName(f.target.value);
        setNewCompanyNameErrorFlag(false);
    }

    const { deleteAccountSetUp } = useDeleteAccountSetUp();
    const { addCompany } = useAddCompany();
    const { fetchCompany } = useGetCompanyByName();
    const { addPropertyManager } = useAddPropertyManager();

    const handleAccountCreation = async () => {
        var temp = user;
        if (fname == ''){
            setFnameErrorFlag(true);
        }
        if (lname == ''){
            setLnameErrorFlag(true);
        }
        if (phoneNum == ''){
            setPhoneNumErrorFlag(true);
        }
        if (!newCompanyFlag && companyIndex == -1){
            setCompanyIndexErrorFlag(true);
        }
        if (newCompanyFlag && newCompanyName == ''){
            setNewCompanyNameErrorFlag(true);
        }
        if (!(fnameErrorFlag || lnameErrorFlag || phoneNumErrorFlag || companyNameErrorFlag || newCompanyNameErrorFlag)){
            await deleteAccountSetUp(user.id);
            var company_id = ''
            if (newCompanyFlag){
                await addCompany(user.id, newCompanyName);
                company_id = await fetchCompany(newCompanyName);
            }
            else{
                company_id = await fetchCompany(companies[companyIndex]);
            }
            company_id = company_id.data[0].company_id
            await addPropertyManager(user.id, fname, lname, phoneNum, user.email, company_id);
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
                onChange={handleCompanyNameChange}
                options={companies} 
                sx={{width: '96%', ml: '2%', mt: '1%', mb: '3%'}} 
                renderInput={(params) => 
                    <TextField 
                        {...params} 
                        label="Company Name" 
                        variant='standard' 
                        error={companyNameErrorFlag}
                        InputLabelProps={{sx: {fontSize: '130%'}}} 
                        value={companyIndex} />}/>
            : 
            <TextField 
                id='NewCompanyName' 
                value={newCompanyName} 
                onChange={handleNewCompanyNameChange} 
                label='Company Name' 
                variant='standard' 
                error={newCompanyNameErrorFlag}
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