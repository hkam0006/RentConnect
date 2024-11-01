import React, { Fragment, useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus';
import {Grid, Button, Card, CardContent, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageCarousel from '../../manager-components/property_page/ImageCarousel';
import useGetCompanyByCompanyID from '../../queries/Company/useGetCompanyByCompanyID';
import useGetPropertyManagersByCompanyID from '../../queries/Property Manager/useGetPropertyManagersByCompanyID';
import useGetPropertiesByCompanyID from '../../queries/Property/useGetPropertiesByCompanyID';

export default function CompanyPage() {
    const navigate = useNavigate();
    const { companyId } = useParams()
    const fetchCompany = useGetCompanyByCompanyID();
    const [company, setCompany] = useState({});
    const propertyManagersData = useGetPropertyManagersByCompanyID(companyId);
    const [propertyManagers, setPropertyManagers] = useState([]);
    const {fetchProperties} = useGetPropertiesByCompanyID();
    const [properties, setProperties] = useState([]);


    useEffect(() => {
      async function getCompanyData() {
        const {data, error} = await fetchCompany(companyId);
        setCompany(data[0]);
      }
      async function getProperties() {
        const {data, error} = await fetchProperties(companyId);
        setProperties(data);
      }

      setPropertyManagers(propertyManagersData);
      getCompanyData();
      getProperties();
    }, [propertyManagersData]);


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
              </Grid>
            </CardContent>
          </Card>
        </Container>
        
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
                                <Link href="#" to={`/PM/${propertyManager.property_manager_id}`} color="inherit" underline="none" style={{ textDecoration: 'none' }}>
                                    {propertyManager?.property_manager_first_name} {propertyManager?.property_manager_last_name}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {propertyManager.property_manager_email}
                              </TableCell>
                              <TableCell>
                                <Button variant="contained" disableElevation onClick={() => navigate(`/renter_messages/${propertyManager.property_manager_id}`)}>Message</Button>
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
      </NavigationMenu>
    );
  };