import React, { Fragment, useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import {Grid, Box, Button, Card, CardContent, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ImageCarousel from '../property_page/ImageCarousel';
import { useSelector } from 'react-redux';
import useGetCompanyByCompanyID from '../../queries/Company/useGetCompanyByCompanyID';
import useGetPropertyManagersByCompanyID from '../../queries/Property Manager/useGetPropertyManagersByCompanyID';
import useGetPropertiesByCompanyID from '../../queries/Property/useGetPropertiesByCompanyID';
import useUpdateCompanyJoinRequest from '../../mutators/Company Join Request/useUpdateCompanyJoinRequest';
import useAddPropertyManagerCompany from '../../mutators/Property Manager Company/useAddPropertyManagerCompany';
import useGetPendingCompanyJoinRequestByCompanyID from '../../queries/Company Join Request/useGetPendingCompanyJoinRequestByCompanyID';
import useGetPropertyManagersWithPendingRequestForCompany from '../../queries/Company Join Request/useGetPropertyManagersWithPendingRequestForCompany';
import useDeletePropertyManagerCompany from '../../mutators/Property Manager Company/useDeletePropertyManagerCompany';
import useDeleteCompanyJoinRequest from '../../mutators/Company Join Request/useDeleteCompanyJoinRequest';

export default function CompanyPage() {
    const navigate = useNavigate();
    const pmCompanyId = useSelector((state) => state.user.currentUser.company_id);
    const pmId = useSelector((state) => state.user.currentUser.property_manager_id)
    const { companyId } = useParams()
    const fetchCompany = useGetCompanyByCompanyID();
    const [company, setCompany] = useState({});
    const propertyManagersData = useGetPropertyManagersByCompanyID(companyId);
    const [propertyManagers, setPropertyManagers] = useState([]);
    const {fetchProperties} = useGetPropertiesByCompanyID();
    const [properties, setProperties] = useState([]);
    const [editingCompanyStaff, setEditingCompanyStaff] = useState(false);
    const updateJoinRequest = useUpdateCompanyJoinRequest();
    const {addPropertyManagerCompany} = useAddPropertyManagerCompany();
    const {joinRequests, loading:joinRequestsLoading} = useGetPropertyManagersWithPendingRequestForCompany(companyId);
    const [requests, setRequests] = useState([]);
    const [requestDialogueOpen, setRequestDialogueOpen] = useState(false);
    const [dialogueType, setRequestDialogueType] = useState("");
    const [requestDialoguePM, setRequestDialoguePM] = useState({});
    const [removePmDialogueOpen, setRemovePmDialogueOpen] = useState(false);
    const [dialoguePmToRemove, setDialoguePmToRemove] = useState({});
    const {deletePropertyManagerCompany} = useDeletePropertyManagerCompany();
    const {deleteCompanyJoinRequest} = useDeleteCompanyJoinRequest();

    useEffect(() => {
      async function getCompanyData() {
        const {data, error} = await fetchCompany(companyId);
        setCompany(data[0]);
      }
      async function getProperties() {
        const {data, error} = await fetchProperties(companyId);
        setProperties(data);
      }
      if (!joinRequestsLoading){
        setRequests(joinRequests);
      }

      setPropertyManagers(propertyManagersData);
      getCompanyData();
      getProperties();
    }, [joinRequestsLoading, propertyManagersData]);

    const handleEditCompanyStaff = f => {
      setEditingCompanyStaff(true);
    };

    const handleSaveCompanyStaff = f => {

      setEditingCompanyStaff(false);
    };

    const handleRequestDialogueClose = () => {
      setRequestDialogueOpen(false);
    };

    const handleRemovePmDialogueClose = () => {
      setRemovePmDialogueOpen(false);
    };

    const handleConfirmRequestDialogue = () => {
      switch(dialogueType){
        case 'accept':
          updateJoinRequest(requestDialoguePM.property_manager_id, companyId, 'accepted');
          addPropertyManagerCompany(requestDialoguePM.property_manager_id, companyId);
          removeRequest(requestDialoguePM.property_manager_id);
          break;
        case 'delete':
          updateJoinRequest(requestDialoguePM.property_manager_id, companyId, 'rejected');
          removeRequest(requestDialoguePM.property_manager_id);
          break;
      }
      setRequestDialogueOpen(false);
    };

    function removeRequest(pmIdToRemove){
      var newPmRequestList = [];
      requests.forEach(request => {
        if (request.property_manager_id !== pmIdToRemove){
          newPmRequestList.push(request);
        }
      });
      setRequests(newPmRequestList);
    }

    function handleOpenAcceptRequest(requestingPropertyManager) {
      setRequestDialogueType('accept');
      setRequestDialoguePM(requestingPropertyManager);
      setRequestDialogueOpen(true);
    };

    function handleOpenDeleteRequest(requestingPropertyManager) {
      setRequestDialogueType('delete');
      setRequestDialoguePM(requestingPropertyManager);
      setRequestDialogueOpen(true);
    };

    function handleOpenRemovePropertyManagerDialogue(propertyManagerToRemove){
      setDialoguePmToRemove(propertyManagerToRemove)
      setRemovePmDialogueOpen(true);
    };

    const handleConfirmRemovePmDialogue = () => {
      deletePropertyManagerCompany(dialoguePmToRemove.property_manager_id, companyId);
      deleteCompanyJoinRequest(dialoguePmToRemove.property_manager_id, companyId);
      removePm(dialoguePmToRemove.property_manager_id)
      setRemovePmDialogueOpen(false);
    };

    function removePm(pmIdToRemove){
      var newPmList = [];
      propertyManagers.forEach(request => {
        if (request.property_manager_id !== pmIdToRemove){
          newPmList.push(request);
        }
      });
      setPropertyManagers(newPmList);
    }

    const gridContainerStyle = {
      display: "grid",
      gridAutoColumns: "1fr",
      gridAutoFlow: "column"
    };

    return (
      <NavigationMenu>
        <Container sx={{ mt: '70px', ml: '1%', p: "20px" }}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center" >
                {/* Left Side */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h2">
                    {company.company_name}
                  </Typography>
                </Grid>
                {/* Right Side */}
                <Grid item xs={12} md={6}>
                  {editingCompanyStaff?
                  <Fragment>
                    {company.super_admin_id === pmId? 
                    <Button variant="contained" disableElevation onClick={handleEditCompanyStaff}>
                      Manage Staff
                    </Button>
                    : ''}
                  </Fragment>
                  :
                  <Button variant="contained" disableElevation onClick={handleSaveCompanyStaff}>
                    Back
                  </Button>
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
        {!editingCompanyStaff?
        <Container sx={{ mt: '1%', ml: '1%'  }} >
          <Grid container spacing={2} sx={{alignItems: "stretch"}}>
            {/* Properties */}
            <Grid item xs={12} md={6}>
              <Card sx={{height: "100%"}}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center'}}>
                    Properties
                  </Typography>
                  <Paper sx={{ overflow: 'hidden', boxShadow: 0 }}> 
                    <TableContainer sx={{ height: '55vh', borderTop: 1, borderColor: 'grey.300'}}>
                      <Table>
                        <TableBody>
                        {properties.map((property) => (
                              <TableRow key={property.property_id}>
                                <TableCell sx={{ width: '35%' }}>
                                  {property.property_pictures ? (
                                    <ImageCarousel images={property.property_pictures} />
                                  ) : null}
                                </TableCell>
                                <TableCell>
                                  {property.property_unit_number
                                    ? `Unit ${property.property_unit_number}`
                                    : ''}{' '}
                                  {property.property_street_number}{' '}
                                  {property.property_street_name} {property.property_street_type},{' '}
                                  {property.property_suburb} {property.property_state}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    onClick={() => navigate(`/property/${property.property_id}`)}
                                  >
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
            {/* Property Managers */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center'}}>
                    Property Managers 
                  </Typography>
                  <Paper sx={{ overflow: 'hidden', boxShadow: 0 }}>
                    <TableContainer sx={{ height: '55vh', borderTop: 1, borderColor: 'grey.300'}}>
                      <Table>
                        <TableBody>
                          {propertyManagers.map((propertyManager) => (
                            <TableRow key={propertyManager.property_manager_id}>
                              <TableCell>
                                <Avatar
                                  src={propertyManager.property_manager_dp || "https://bpnlxdcsmicxotakbydb.supabase.co/storage/v1/object/public/PMDP/default.jpg"}
                                  alt="Property Manager"
                                  sx={{ width: 32, height: 32, marginRight: 1 }}
                                />
                              </TableCell>
                              <TableCell>
                                {propertyManager.property_manager_first_name + ' ' + propertyManager.property_manager_last_name}
                              </TableCell>
                              <TableCell>
                                {propertyManager.property_manager_email}
                              </TableCell>
                              <TableCell>
                                <Button variant="contained" disableElevation onClick={() => navigate(`/messages/${propertyManager.property_manager_id}`)}>Message</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        :
        <React.Fragment>
          <Container sx={{ mt: '1%', ml: '1%' }} >
            <Grid container spacing={2} sx={{alignItems: "stretch", display: 'flex', flexDirection:'row'}}>
              {/* Property Managers Edit*/}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center'}}>
                    Property Managers
                    </Typography>
                    <Paper sx={{ overflow: 'hidden', boxShadow: 0 }}>
                      <TableContainer sx={{ height: '55vh', borderTop: 1, borderColor: 'grey.300'}}>
                        <Table>
                          <TableBody>
                            {propertyManagers.map((propertyManager) => (
                              <TableRow key={propertyManager.property_manager_id}>
                                <TableCell>
                                  <Avatar
                                    src={propertyManager.property_manager_dp || "https://bpnlxdcsmicxotakbydb.supabase.co/storage/v1/object/public/PMDP/default.jpg"}
                                    alt="Property Manager"
                                    sx={{ width: 32, height: 32, marginRight: 1 }}
                                  />
                                </TableCell>
                                <TableCell>
                                  {propertyManager.property_manager_first_name + ' ' + propertyManager.property_manager_last_name}
                                </TableCell>
                                <TableCell>
                                  {propertyManager.property_manager_email}
                                </TableCell>
                                <TableCell>
                                  <Button variant='contained' color='primary' style={{ backgroundColor: 'red', color: 'white'}} onClick={() => handleOpenRemovePropertyManagerDialogue(propertyManager)}>
                                    Remove
                                  </Button>                              
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
              {/* Property Managers Requests */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center'}}>
                      Property Manager Requests
                    </Typography>
                    <Paper sx={{ overflow: 'hidden', boxShadow: 0 }}>
                      <TableContainer sx={{ height: '55vh', borderTop: 1, borderColor: 'grey.300'}}>
                        <Table>
                          <TableBody>
                            {requests.map((propertyManager) => (
                              <TableRow key={propertyManager.property_manager_id}>
                                <TableCell>
                                  {propertyManager.property_manager_email}
                                </TableCell>
                                <TableCell>
                                  <Button variant='contained' color='primary' style={{ backgroundColor: 'green', color: 'white'}} onClick={() => handleOpenAcceptRequest(propertyManager)}>
                                    Accept
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button variant='contained' color='primary' style={{ backgroundColor: 'red', color: 'white'}} onClick={() => handleOpenDeleteRequest(propertyManager)}>
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
          <Dialog
          open={requestDialogueOpen}
          onClose={handleRequestDialogueClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogueType === 'accept'? 'Accpet':'Delete'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogueType === 'accept'? 'Are you sure you want to add ' + requestDialoguePM.property_manager_email + ' to your company?':'Are you sure you want to delete ' + requestDialoguePM.property_manager_email + "'s request?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRequestDialogueClose}>Cancel</Button>
            <Button onClick={handleConfirmRequestDialogue} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={removePmDialogueOpen}
          onClose={handleRemovePmDialogueClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remove Property Manager"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Are you sure you want to remove " + dialoguePmToRemove.property_manager_email + " from " + company.company_name + "?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRemovePmDialogueClose}>Cancel</Button>
            <Button onClick={handleConfirmRemovePmDialogue} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
        }
      </NavigationMenu>
    );
  };