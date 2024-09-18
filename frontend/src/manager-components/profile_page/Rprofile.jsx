import React, {useCallback, useEffect, useMemo, useState} from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, Divider, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetRenterByRenterID from '../../queries/Renter/useGetRenterByRenterID';
import useGetApplicationsByRenterID from '../../queries/Application/useGetApplicationsByRenterID';
import useGetPropertyByPropertyID from '../../queries/Property/useGetPropertyByPropertyID';
import useGetRenterCommentsWithPMInfoByRenterID from '../../queries/Renter Comment/useGetRenterCommentsWithPMInfoByRenterID';
import useAddRenterComment from '../../mutators/Renter Comment/useAddRenterComment';
import useGetPropertyManagerByPropertyManagerID from '../../queries/Property Manager/useGetPropertyManagerByPropertyManagerID';
import { supabase } from '../../supabase';
import useSubscribeRenterCommentByRenterID from '../../subscribers/Renter Comment/useSubscribeRenterCommentByRenterID';
import useGetPropertiesByPropertyIDs from "../../queries/Property/useGetPropertiesByPropertyIDs";
import AppLoader from "../property_page/AppLoader";
import useGetUserID from "../../queries/useGetUserID";

export default function RprofileForPM() {
    const { rID } = useParams()
    const {userID, loading: userLoading} = useGetUserID();
    const navigate = useNavigate();
    const {renter: renterData, loading: renterLoading} = useGetRenterByRenterID(rID);
    const {applications: baseApplications, loading: appLoading} = useGetApplicationsByRenterID(rID);
    const {comments: commentData, loading: commentsLoading} = useGetRenterCommentsWithPMInfoByRenterID(rID);
    const fetchProperty = useGetPropertyByPropertyID();
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const addComment = useAddRenterComment();
    const {propertyManager: pmData, loading: pmLoading} = useGetPropertyManagerByPropertyManagerID(userID);

    // get all applications from renter
    // get the properties from applications
    // create array containing applications, and addresses
    const propertyIDs = useMemo(() => baseApplications.map(application => application.property_id), [baseApplications]);
    const {properties, loading: propLoading} = useGetPropertiesByPropertyIDs(propertyIDs)
    let applications = []
    if (properties.length > 0) {
        const applicationsWithAddresses = baseApplications.map((app, index) => {
            let property = properties[index];
            let address = `${property.property_unit_number ? `Unit ${property.property_unit_number}` : ''} ${property.property_street_number} ${property.property_street_name} ${property.property_street_type}, ${property.property_suburb} ${property.property_state}`
            applications.push([app, address])
        })
    }

    // get renter data
    let renter = {}
    if (!renterLoading) {
        renter = renterData[0];
    }

    // get pm data
    let property_manager = {};
    if (!pmLoading) {
        property_manager = pmData[0];
    }

    // setup comments
    const [renterComments, setRenterComments] = useState([]);
    if (!commentsLoading && renterComments.length === 0) {
        setRenterComments(commentData);
    }

    /*
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
        
        async function getPMData(){
            const {data, error} = await supabase.auth.getUser();
            const property_manager = await fetchPropertyManager(data.user?.id);
            setPropertyManager(property_manager.data[0]);
        }

        getComments();
        getPMData();
        getRData();
        getApplications();
    }, [rID, fetchRenter, fetchApplications, fetchRenterComments, fetchProperty, fetchPropertyManager]);

     */

    const handleNewComment = useCallback((payload) => {
        setRenterComments(prevComments => [...prevComments, payload.new]);
    }, []);

    useSubscribeRenterCommentByRenterID(rID, handleNewComment);


    function handleAddComment(commentContents) {
        addComment(property_manager.property_manager_id, rID, property_manager.company_id, commentContents);
    }

    const handleCloseAddComment = () => {
        setDialogueOpen(false);
    }

    const handleOpenAddComment = () => {
        setDialogueOpen(true);
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
                        <Paper sx={{overflow:'auto', boxShadow:'0',  height:'50vh'}}>
                            {renterComments.length > 0? 
                            <List sx={{height:'50vh'}}>
                                {renterComments.map((comment) =>(
                                    <React.Fragment>
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
                                    </React.Fragment>
                                ))} 
                            </List>
                            :""} 
                        </Paper>
                        <Box sx={{display:'flex', flexDirection:'row-reverse', mt:'3%'}}>
                            <Button variant='contained' onClick={handleOpenAddComment}>Add Comment</Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{width:'40%', ml:'1%'}}>
                    <CardContent>
                        <Typography sx={{fontWeight:'bold'}}>
                        {renter.renter_first_name} {renter.renter_last_name}'s current applications:
                        </Typography>
                        <Paper sx={{overflow:'hidden', boxShadow:'0'}}>
                            {propLoading ? <AppLoader /> : (
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
                                        {
                                    applications.map((application) => (
                                        <TableRow key={application[0].property_id}>
                                            <TableCell>
                                                {application[1]}
                                            </TableCell>
                                            <TableCell>
                                                {application[0].application_status}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='contained' onClick={() => navigate(`/ApplicationDetails/${application[0].company_id}/${application[0].property_id}/${application[0].renter_id}`)}>View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                    :""}
                                </Table>
                            </TableContainer>)}
                        </Paper>
                    </CardContent>
                </Card>
            </Container>
            <Dialog
        open={dialogueOpen}
        onClose={handleCloseAddComment}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const commentContents = formJson.contents;
            handleAddComment(commentContents);
            handleCloseAddComment();
          },
        }}
      >
        <DialogContent sx={{width:'50vh'}}>
          <TextField
            required
            name="contents"
            fullWidth
            variant="outlined"
            multiline
            rows={10}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddComment}>Cancel</Button>
          <Button type="submit" variant='contained'>Add Comment</Button>
        </DialogActions>
      </Dialog>
        </NavigationMenu>
    )
}
