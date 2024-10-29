import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetCompanyByCompanyID from "../../queries/Company/useGetCompanyByCompanyID";
import useGetCompanyJoinRequestByPropertyManagerID from "../../queries/Company Join Request/useGetCompanyJoinRequestByPropertyManagerID";
import logo from "../../RENTCONNECT-2.png";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import AppLoader from "../property_page/AppLoader";
import useGetCompanies from "../../queries/Company/useGetCompanies";
import useAddCompanyJoinRequest from "../../mutators/Company Join Request/useAddCompanyJoinRequest";

export default function WaitingForCompany() {
    const navigate = useNavigate();
    const fetchCompany = useGetCompanyByCompanyID();
    const pmId = useSelector((state) => state.user.currentUser.property_manager_id)
    const {joinRequests, loading: joinRequestsLoading} = useGetCompanyJoinRequestByPropertyManagerID(pmId);
    const [noRequest, setNoRequest] = useState(false);
    const [waitingText, setWaitingText] = useState("");
    const {companies, loading: companiesLoading} = useGetCompanies();
    const [companyNameList, setCompanyNameList] = useState([]);
    const { addCompanyJoinRequest } = useAddCompanyJoinRequest();
    
    useEffect(() => {
        async function getRequestData() {
            var status = '';
            var companyId = '';
            var companyName = '';
            joinRequests.forEach(request => {
                if (request.request_status === 'pending'){
                    companyId = request.company_id;
                    setNoRequest(false);
                    status = 'pending';
                }
                else if (request.request_status === 'rejected'){
                    companyId = request.company_id;
                    setNoRequest(true);
                    status = 'rejected';
                }
            });
            if (companyId === ''){
                setNoRequest(true);
                status = 'removed';
            }
            else{
                try{
                    const companyTemp = await fetchCompany(companyId);
                    companyName = companyTemp.data[0].company_name;
                }
                catch{}
            }
            switch(status){
                case 'rejected':
                    setWaitingText("Your request to join " + companyName + " was rejected.  You can request to join a different company.");
                    break;
                case 'pending':
                    setWaitingText("Waiting for " + companyName + " to accept your request.");
                    break;
                case 'removed':
                    setWaitingText("You have been removed from your company.  You can request to join a different company.");
                    break;
            }
        }
        function getCompanyData(){
            var companyNames = [];
            companies.forEach(company => {
                companyNames.push(company.company_name);
            });
            setCompanyNameList(companyNames);
        }
        if(!joinRequestsLoading){
            getRequestData();
        }
        if(!companiesLoading){
            getCompanyData();
        }
    }, [joinRequestsLoading, companiesLoading]);

    const handleLogOut = () => {
        supabase.auth.signOut().then(data=> {
            if (data.error){
                console.log('Failed to log out:')
                console.log(data.error)
            }
        })
        .catch(error => {
            console.log('Failed to log out:')
            console.log(error)
        })
        navigate('/Landing')
    };

    const handleRefresh = () => {
        navigate('/dashboard');
    };

    const [companyIndex, setCompanyIndex] = useState(-1);
    const [companyNameErrorFlag, setCompanyNameErrorFlag] = useState(false);
    const [companyNameErrorText, setCompanyNameErrorText] = useState("");
    const handleCompanyNameChange = f => {
        setCompanyIndex(f.target.value);
        setCompanyNameErrorFlag(false);
        setCompanyNameErrorText("");
    };

    const handleSendRequest = async () => {
        if (companyIndex > - 1){
            setCompanyNameErrorFlag(true);
            setCompanyNameErrorText("You must select a company");
            return;
        }
        const {error} = await addCompanyJoinRequest(pmId, companies[companyIndex].company_id);
        if(error){
            setCompanyNameErrorFlag(true);
            setCompanyNameErrorText("You have been rejected by this company");
            return;
        }
        setNoRequest(false);
        setWaitingText("Waiting for " + companies[companyIndex].company_name + " to accept your request.");
    };

    return (
        <Box sx={{ml: '30%', mt: '1%', backgroundColor: 'white', width: '40%', borderRadius: 2, flexDirection:'column', display:'flex'}}>
            <Box sx={{display:'inline-flex', justifyContent: 'center'}}>
                <img src={logo} alt="Logo" width="70" height="70" />
            </Box>
            {!joinRequestsLoading? 
                <Box sx={{fontSize: '220%', fontWeight: 'bold', textAlign: 'center'}}>{waitingText}</Box>
            :
                <AppLoader />
            }
            <br/>
            {noRequest?
            <Autocomplete 
            disablePortal 
            id="company" 
            onChange={handleCompanyNameChange}
            options={companyNameList} 
            sx={{width: '96%', ml: '2%', mt: '1%', mb: '3%'}} 
            renderInput={(params) => 
                <TextField 
                    {...params} 
                    label="Company Name" 
                    variant='standard' 
                    error={companyNameErrorFlag}
                    helperText={companyNameErrorText}
                    InputLabelProps={{sx: {fontSize: '130%'}}} 
                    value={companyIndex} />}/>
            :''}
            <br/>
            <Box sx={{display:'inline-flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={handleLogOut} sx={{mr:'3%'}}>Log Out</Button>
                {noRequest?
                <Button variant="contained" onClick={handleSendRequest}>Send Request</Button>
                :
                <Button variant="contained" onClick={handleRefresh}>Refresh</Button>
                }
            </Box>
            <br/>
        </Box>
    )
}