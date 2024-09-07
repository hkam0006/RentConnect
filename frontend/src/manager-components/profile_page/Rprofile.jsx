import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { Box, Button, Card, CardContent, Container, Divider, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetRenterByRenterID from '../../queries/Renter/useGetRenterByRenterID';
import useGetApplicationsByRenterID from '../../queries/Application/useGetApplicationsByRenterID';
import useGetPropertyByPropertyID from '../../queries/Property/useGetPropertyByPropertyID';
import useGetRenterCommentsWithPMInfoByRenterID from '../../queries/Renter Comment/useGetRenterCommentsWithPMInfoByRenterID';

export default function Rprofile() {
    const { rID } = useParams()
    const navigate = useNavigate();
    const fetchRenter = useGetRenterByRenterID();
    const [renter, setRenter] = useState({});
    const [applications, setApplications] = useState([{}])
    const fetchApplications = useGetApplicationsByRenterID();
    const fetchRenterComments = useGetRenterCommentsWithPMInfoByRenterID();
    const [renterComments, setRenterComments] = useState([{}]);
    const fetchProperty = useGetPropertyByPropertyID();

    useEffect(() => {
        async function getRData() {
            const r = await fetchRenter(rID);
            setRenter(r.data[0]);
        }
        async function getApplications() {
            const applications = await fetchApplications(rID);
            if (applications.data.length > 0){
                const applicationsWithAddresses = await Promise.all(applications.data.map(async (application) => {
                    const property = await fetchProperty(application.property_id);
                    const address = `${property.data[0].property_unit_number ? `Unit ${property.data[0].property_unit_number}` : ''} ${property.data[0].property_street_number} ${property.data[0].property_street_name} ${property.data[0].property_street_type}, ${property.data[0].property_suburb} ${property.data[0].property_state}`;
                    return { ...application, address };
                }));
                setApplications(applicationsWithAddresses);
            }
        }
        async function getComments() {
            const comments = await fetchRenterComments(rID);
            setRenterComments(comments.data);
        }

        getRData();
        getApplications();
        getComments();
    }, []);

    function handleAddComment() {
        
    }

    return (
        <NavigationMenu>
            <Container sx={{mt:'8%', ml:'1%'}}>
                <Card>
                    <CardContent>
                        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography variant='h2'>
                                {renter.renter_first_name} {renter.renter_last_name}
                            </Typography>
                            <Box sx={{display:'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                                <Typography variant='h5' sx={{textAlign: 'right'}}>
                                    {renter.renter_email}
                                </Typography>
                                <Typography variant='h5' sx={{textAlign: 'right'}}>
                                    {renter.renter_phone_number}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography variant='h5'>
                                
                            </Typography>
                            <Button variant="contained" disableElevation onClick={() => navigate(`/messages/${renter.property_manager_id}`)}>Message</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{mt:'1%', ml:'1%', display:'flex', flexDirection:'row'}}>
                <Card sx={{width:'30%'}}>
                    <CardContent>
                        {renter.renter_dp?
                            <img src={renter.renter_dp} 
                            style={{
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                            }}/>
                            :
                            <img src={'https://bpnlxdcsmicxotakbydb.supabase.co/storage/v1/object/public/PMDP/default.jpg'} 
                            style={{
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                            }}/>
                        }
                    </CardContent>
                </Card>
                <Card sx={{width:'28%', ml:'1%'}}>
                    <CardContent>
                        <Typography sx={{fontWeight:'bold'}}>
                            Comments:
                        </Typography>
                        <Paper sx={{overflow:'hidden', boxShadow:'0'}}>
                            {renterComments.length > 0? 
                            <List sx={{height:'50vh'}}>
                                {renterComments.map((comment) =>(
                                    <Box>
                                    <ListItem alignItems="flex-start" key={comment.renter_comment_id}>
                                        <ListItemText
                                        primary= {comment.renter_comment_contents }
                                        secondary={
                                        <React.Fragment>
                                            <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                                <Link href="#" to={`/PMprofile/${comment.property_manager_id}`} color="inherit" underline="none" style={{ textDecoration: 'none' }}>
                                                    {comment["PROPERTY MANAGER"]?.property_manager_first_name} {comment["PROPERTY MANAGER"]?.property_manager_last_name}
                                                </Link>
                                                <Typography>
                                                    {`${comment.renter_comment_date?.substring(8,10)}/${comment.renter_comment_date?.substring(5,7)}/${comment.renter_comment_date?.substring(0,4)}`}
                                                </Typography>
                                            </Box>
                                        </React.Fragment>}
                                        />
                                    </ListItem>
                                    <Divider component="li" sx={{mt:'-4%'}}/>
                                    </Box>
                                ))} 
                            </List>
                            :""} 
                        </Paper>
                        <Box sx={{display:'flex', flexDirection:'row-reverse'}}>
                            <Button variant='contained' onClick={handleAddComment}>Add Comment</Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{width:'40%', ml:'1%'}}>
                    <CardContent>
                        <Typography sx={{fontWeight:'bold'}}>
                        {renter.renter_first_name} {renter.renter_last_name}'s current applications:
                        </Typography>
                        <Paper sx={{overflow:'hidden', boxShadow:'0'}}>
                            <TableContainer sx={{height:'55vh'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {applications.length > 0? 
                                    <TableBody>
                                    {applications.map((application) => (
                                        <TableRow key={application.property_id}>
                                            <TableCell>
                                                {application.address}
                                            </TableCell>
                                            <TableCell>
                                                {application.application_status}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='contained' onClick={() => navigate(`/ApplicationDetails/${application.company_id}/${application.property_id}/${application.renter_id}`)}>View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                    :""}
                                </Table>
                            </TableContainer>
                        </Paper>
                    </CardContent>
                </Card>
            </Container>
        </NavigationMenu>
    )
}
