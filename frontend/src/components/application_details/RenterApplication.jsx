import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import NavigationMenu from "../navigation_menu/NavigationMenus";
import {Card, CardContent, CardMedia, Grid, IconButton, TextField, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import defaultImageUrl from "../dashboard_page/house_default.jpg";
import {useState} from "react";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import dayjs from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// function to get the first line of the address (eg. Unit 502 / 64 Example Street)
function getPropertyFirstLine(property) {
    let string = "";

    if (property.unit > 0) {
        string = string + (`Unit ${property.unit} / `)
    }

    string = string + (`${property.house_number} ${property.street_name}`);

    return string;
}

// function to get the second line of the address (eg. Exampleville, VIC 3575)
function getPropertySecondLine(property) {
    return (`${property.suburb}, ${property.state} ${property.postcode}`);
}

export default function RenterApplication() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Dummy property
    const [property, setProperty] = useState({
        house_number: "30",
        street_name: 'Chapel Street',
        unit: "52",
        suburb: "Prahran",
        state: 'VIC',
        postcode: "3181",
        bedrooms: 2,
        bathrooms: 2,
        carSpots: 1,
        squareMetres: 285,
        vacancy: 25,
        attendees: 31,
        applications: 15,
        listingImages: [
            defaultImageUrl
        ],
        type: "Townhouse",
        price: "750",
        available: "31st March 2024",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    });

    // stepper string values
    const steps = [
        'Personal Information',
        'ID Documents',
        'Credit Assessment',
        'Justification',
    ];

    return (
        <React.Fragment>
            <NavigationMenu />
            <Grid
                container
                spacing={2}
                style={{ padding: "20px", paddingTop: '80px' }}
                justifyContent="flex-start"
            >
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open Application Dialog
                    </Button>
                </Grid>
                <Dialog
                    fullWidth="xl"
                    maxWidth="xl"
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>New Application</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            style={{ padding: "20px", paddingTop: '0px' }}
                            justifyContent="flex-start"
                        >
                            {/* side card containing property information */}
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                >
                                    <Grid item xs={3}>
                                        <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={defaultImageUrl}
                                                alt="House Appointment"
                                            />
                                            <CardContent>
                                                <Typography wordWrap="break-word" variant="h6" color="text.primary">
                                                    {getPropertyFirstLine(property)}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">{getPropertySecondLine(property)}</Typography>
                                                <Typography sx={{ mt: 4 }} variant="h6">
                                                    <BedIcon /> {property.bedrooms} <BathtubIcon /> {property.bathrooms} <DriveEtaIcon /> {property.carSpots} <SquareFootIcon /> {property.squareMetres}m²
                                                </Typography>
                                                <Typography sx={{ mt: 4 }} variant="h5">
                                                    ${property.price} per week
                                                </Typography>
                                                <Typography sx={{ mt: 4 }} color="text.secondary">
                                                    {property.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* main panel for application */}
                            <Grid item xs>
                                <Grid
                                    container
                                    direction="column"
                                    spacing={2}
                                    justifyContent="flex-start"
                                >
                                    {/* card for stepper showing application progress */}
                                    <Grid item sx={{ width: "100%", minHeight: "100%"}}>
                                        <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                                            <CardContent>
                                                <Stepper activeStep={0} alternativeLabel>
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel>{label}</StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* card for the application to be filled out */}
                                    <Grid item xs>
                                        <Card sx={{ width: "100%", minHeight: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                                            <CardContent>
                                                <Box sx={{ display: "flex", justifyContent: 'space-between', p: 1 }}>
                                                    <TextField required id="outlined-required" label="First Name" defaultValue="Hello World" />
                                                    <TextField required id="outlined-required" label="Last Name" defaultValue="Hello World" />
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateField required label="Date of Birth" defaultValue={dayjs('2022-04-17')} />
                                                    </LocalizationProvider>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button variant="contained" onClick={handleClose}>Next</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </React.Fragment>
    );
}