import React, {useEffect, useRef, useState} from 'react';
import {
    Container,
    Stack,
    Typography,
    Box,
    Grid,
    Divider,
    Card,
    CardContent,
    Button,
    Table,
    TableHead, TableRow, TableBody, TableCell, tableCellClasses, Chip
} from '@mui/material';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import InspectionRequestModal from './InspectionRequestModal';
import ImageCarousel from '../../manager-components/property_page/ImageCarousel';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import { useParams } from 'react-router-dom';
import useGetPropertyByPropertyID from '../../queries/Property/useGetPropertyByPropertyID';
import AppLoader from "../../manager-components/property_page/AppLoader";
import Paper from "@mui/material/Paper";
import useGetUserID from "../../queries/useGetUserID";
import useGetApplicationsByPropertyAndUserID from "../../queries/Application/useGetApplicationsByPropertyAndUserID";
import MapShowingProperty from "../../public-components/MapShowingProperty";
import ApplicationsTable from "../renter_home/ApplicationsTable";
import ImgElement from "../../manager-components/property_page/ImgElement";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {styled} from "@mui/material/styles";
import RenterApplication from "../renter_application/RenterApplication";

/**
 * A page which shows a property and its information; and all applications made by the signed-in renter at this
 * property. The property to display can be found by the propertyID found in the params of the URL.
 * @author Luke Phillips
 */
export default function RenterApplicationDetails() {

    // Cuncomment below to view the table
    const viewings = [
        // viewing1,
        // viewing2
    ]

    // get user ID
    const {userID, loading: userLoading} = useGetUserID();

    // property ID to query database.
    const { propertyId } = useParams()
    const { property, loading: propertyLoading } = useGetPropertyByPropertyID(propertyId);

    // get applications from user at this property
    const { applications, loading: applicationLoading } = useGetApplicationsByPropertyAndUserID(propertyId, userID)

    // determine if there is an application
    const [hasActiveApplication, setHasActiveApplication] = useState(false);
    if (applications.length > 0 && !hasActiveApplication) { setHasActiveApplication(true); }

    /* original check if there was an active applicaiton
    // but decided to check if there was any application at the property
    for (let i=0; i<applications.length; i++) {
        if (applications[i].application_status === "approved" && !hasActiveApplication) {
            setHasActiveApplication(true)
        }
    }

     */

    const dialogRef = useRef();

    const handleOpenDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.openDialog(); // Trigger openDialog method in child
        }
    };

    // For request inspection modal
    const [inspectionRequestOpen, setInspectionRequestOpen] = useState(false);
    const [inspectionRequestData, setInspectionRequestData] = useState(property);
    const handleInspectionRequestOpen = () => setInspectionRequestOpen(true);
    const handleInspectionRequestClose = () => setInspectionRequestOpen(false);

    // Edit modal submit functionality
    const handleInspectionRequestSubmit = () => {
        console.log("Viewing request submitted ", inspectionRequestData);
        // Foer editting, handle database changes here
        handleInspectionRequestClose();
    };

    // returns loading icon if still loading, or says no property found if none could be found
    if (propertyLoading || applicationLoading) return <AppLoader />
    if (!property) {
        return <Typography>No property found.</Typography>
    }

    let prop = property[0];
    return <>
        {inspectionRequestOpen && (
            <InspectionRequestModal
                open={inspectionRequestOpen}
                handleClose={handleInspectionRequestClose}
                data={inspectionRequestData}
                setData={setInspectionRequestData}
                handleSubmit={handleInspectionRequestSubmit}
            />
        )}
        <NavigationMenu>
            <div style={{padding: "20px", marginTop: "64px"}}>
                <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
                    <Card>
                        <CardContent>
                            <Grid container justifyContent='flex-end'>
                                <Stack direction='row' spacing={1}>
                                    <Button
                                        variant='contained'
                                        size='medium'
                                        style={{ color: 'white' }}
                                    >
                                        Message the agent
                                    </Button>
                                    {hasActiveApplication ? null : (
                                        <Button
                                            variant='contained'
                                            size='medium'
                                            style={{ backgroundColor: 'green', color: 'white' }}
                                            endIcon={<OpenInNewIcon />}
                                            onClick={handleOpenDialog}
                                        >
                                            Apply
                                        </Button>
                                    )}
                                    <RenterApplication ref={dialogRef} providedProperty={property} />
                                </Stack>
                            </Grid>
                            <Divider sx={{ mt: 2, mb: 2 }}/>
                            <Grid container spacing={2} sx={{maxHeight: '100%'}}>
                                <Grid item md={6} xl={8}>
                                    <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                                        {'' + prop.property_street_number + ' ' + prop.property_street_name + ' ' + prop.property_street_type}
                                    </Typography>
                                    <Typography variant="h5">
                                        {prop.property_suburb + ', ' + prop.property_state}
                                    </Typography>
                                    <Box>
                                        <Typography variant="h7">
                                            {prop.property_type}
                                        </Typography>
                                        <Typography sx={{ mt: 2, fontWeight: 'bold' }} variant="h5">
                                            ${'' + prop.property_rent} per week
                                        </Typography>
                                        <Typography sx={{ mt: 2 }} variant="h6">
                                            <BedIcon /> {'' + prop.property_bedroom_count} <BathtubIcon /> {'' + prop.property_bathroom_count} <DriveEtaIcon /> {'' + prop.property_car_spot_count} <SquareFootIcon /> {'' + prop.property_footprint}m²
                                        </Typography>
                                        <Typography sx={{ mt: 2 }}>
                                            Available from: {prop.property_lease_start}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={6} xl={4} style={{maxHeight: '500px', justifyContent: 'flex-end'}} id="photos">
                                    {
                                        prop.property_pictures && prop.property_pictures.length > 0 && (
                                            <ImageCarousel images={prop.property_pictures} />
                                        )
                                    }
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: 2, mb: 2 }}/>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h5" gutterBottom>
                                        Description
                                    </Typography>
                                    <Typography>
                                        {prop.property_description}
                                    </Typography>
                                    <Divider sx={{ mt: 2, mb: 2 }}/>
                                    <Typography variant="h5" gutterBottom>
                                        Amenities
                                    </Typography>
                                    <Typography>
                                        {prop.property_amenities}
                                    </Typography>
                                </Grid>
                                <Divider orientation='vertical' flexItem sx={{ mx: 2 }} />
                                <Grid item xs={5}>
                                        <MapShowingProperty property={property} />
                                </Grid>
                            </Grid>
                            <Divider sx={{ mb: 2 }}/>
                            <Typography variant="h5" style={{fontWeight: 'bold'}} gutterBottom>
                                Applications
                            </Typography>
                            <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
                                <PropertyApplicationsTable applications={applications}/>
                            </Paper>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        </NavigationMenu>
    </>
}

/**
 * A custom Chip which shows the application status. Required application status to be passed
 * as a parameter.
 *
 *
 * @param appStatus string containing status of the application
 * @returns a customised Chip component
 * @author Luke Phillips
 */
function ApplicationStatusChip(appStatus) {
    if (appStatus.appStatus === "approved") {
        return <Chip label="Approved" color="success"/>
    } else if (appStatus.appStatus === "rejected") {
        return <Chip label="Rejected" color="error"/>
    } else {
        return <Chip label="In Progress" color="info" variant="outlined"/>
    }
}

/**
 * Returns the most recent updated date of the application (or today's date if field is NULL)
 *
 * @memberof RenterApplicationStatus
 * @param application the application we are checking
 * @returns a Date object with last updated Date or today's date
 * @author Luke Phillips
 */
function applicationLastUpdated(application) {
    if (application.application_status_finalised_date) {
        return new Date(application.application_status_finalised_date).toLocaleDateString('en-GB')
    } else {
        return new Date().toLocaleDateString('en-GB')
    }
}

/**
 * A component which displays all applications the users has made at this property.
 * @memberof RenterApplicationStatus
 * @param applications array containing all applications to show
 * @returns component to display
 * @author Luke Phillips
 */
function PropertyApplicationsTable({applications}) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "white",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
        },
    }));

    if (applications.length == 0) {
        return (
            <Table stickyHeader sx={{minWidth: 650}} aria-label="Table of properties">
                <TableHead>
                    <TableRow>
                        <StyledTableCell><Typography fontSize={"12px"} fontWeight={700}>Application Date </Typography></StyledTableCell>
                        <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Last Updated</Typography></StyledTableCell>
                        <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Application Status</Typography></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell width={{width: "fit-content"}}>
                            {/* <Card sx={{ padding: 2, }} > */}
                            <Typography variant='body' fontWeight={700}>
                                No found applications at this address.
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }

    return (
        <Table stickyHeader sx={{minWidth: 650}} aria-label="Table of properties">
            <TableHead>
                <TableRow>
                    <StyledTableCell><Typography fontSize={"12px"} fontWeight={700}>Application Date </Typography></StyledTableCell>
                    <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Last Updated</Typography></StyledTableCell>
                    <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Application Status</Typography></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {applications.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell width={{width: "fit-content"}}>
                            {/* <Card sx={{ padding: 2, }} > */}
                            <Typography variant='body' fontWeight={700}>
                                {new Date(row.application_apply_date).toLocaleDateString('en-GB')}
                            </Typography>
                            {/*}
                            <Stack direction='row' spacing={2} justifyContent="start" sx={{width: "fit-content"}}>
                                test
                            </Stack>
                            */}
                            {/* </Card> */}
                        </TableCell>
                        <TableCell align="right">
                            {applicationLastUpdated(row)}
                        </TableCell>
                        <TableCell align="right">
                            <ApplicationStatusChip appStatus={row.application_status}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

// Function to display amenities of a property
function AmenitiesList({ amenities }) {
    const amenitiesArray = Object.values(amenities);

    // Split index for the two columns
    const halfLength = Math.ceil(amenitiesArray.length / 2);
    const firstColumnItems = amenitiesArray.slice(0, halfLength);
    const secondColumnItems = amenitiesArray.slice(halfLength);

    return (
        <Grid container>
            <Grid item xs={6}>
                {firstColumnItems.map(([label, IconComponent], index) => (
                    <Grid container key={index} alignItems='center' spacing={2}>
                        <Grid item>
                            <IconComponent />
                        </Grid>
                        <Grid item>
                            <Typography>{label}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={6}>
                {secondColumnItems.map(([label, IconComponent], index) => (
                    <Grid container key={index} alignItems='center' spacing={2}>
                        <Grid item>
                            <IconComponent />
                        </Grid>
                        <Grid item>
                            <Typography>{label}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>

    );
}