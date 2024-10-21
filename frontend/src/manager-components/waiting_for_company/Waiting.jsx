import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetCompanyByCompanyID from "../../queries/Company/useGetCompanyByCompanyID";
import useGetCompanyJoinRequestByPropertyManagerID from "../../queries/Company Join Request/useGetCompanyJoinRequestByPropertyManagerID";
import logo from "../../RENTCONNECT-2.png";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import AppLoader from "../property_page/AppLoader";

export default function WaitingForCompany() {
    const navigate = useNavigate();
    const [company, setCompany] = useState({});
    const fetchCompany = useGetCompanyByCompanyID();
    const pmId = useSelector((state) => state.user.currentUser.property_manager_id)
    const {joinRequest, loading} = useGetCompanyJoinRequestByPropertyManagerID(pmId);
    
    
    useEffect(() => {
        async function getCompanyData() {
            try{
                const companyTemp = await fetchCompany(joinRequest.company_id);
                setCompany(companyTemp.data[0]);
            }
            catch{}
        }
        if(!loading){
            getCompanyData();
        }
    }, [loading]);

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
    }

    const handleRefresh = () => {
        navigate('/dashboard');
    }

    return (
        <Box sx={{ml: '30%', mt: '1%', backgroundColor: 'white', width: '40%', borderRadius: 2, flexDirection:'column', display:'flex'}}>
            <Box sx={{display:'inline-flex', justifyContent: 'center'}}>
                <img src={logo} alt="Logo" width="70" height="70" />
            </Box>
            {!loading? 
                <Box sx={{fontSize: '220%', fontWeight: 'bold', textAlign: 'center'}}>Waiting for {company.company_name} to accept your join request.</Box>
            :
                <AppLoader />
            }
            <br/>
            <Box sx={{display:'inline-flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={handleLogOut} sx={{mr:'3%'}}>Log Out</Button>
                <Button variant="contained" onClick={handleRefresh}>Refresh</Button>
            </Box>
            <br/>
        </Box>
    )
}