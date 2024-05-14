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
    // variables and methods for opening and closing dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // variables and methods for the stepper and progressing application
    const [stepperValue, setStepperValue] = React.useState(0);
    const progressApplication = () => {
        const newStepperValue = stepperValue + 1;
        setStepperValue(newStepperValue);
        changeToGoBackButton();
        if (newStepperValue === 3) {
            changeToApplyButton();
        }
    }
    const goBackApplication = () => {
        const newStepperValue = stepperValue - 1;
        setStepperValue(newStepperValue);
        changeToNextButton();
        if (newStepperValue === 0) { changeToCloseButton() }
    }

    // setting values and functions for primary button
    const [primaryButtonNextState, setPrimaryButtonNextState] = React.useState(true);
    const [primaryButtonLabel, setPrimaryButtonLabel] = React.useState("Next");
    const primaryButton = () => {
        if (primaryButtonNextState) {
            progressApplication();
        } else {
            handleClose();
        }
    }
    const changeToApplyButton = () => {
        setPrimaryButtonNextState(false);
        setPrimaryButtonLabel("Apply");
    }
    const changeToNextButton = () => {
        setPrimaryButtonNextState(true);
        setPrimaryButtonLabel("Next");
    }

    // setting values and functions for secondary button
    const [secondaryButtonCloseState, setSecondaryButtonCloseState] = React.useState(true);
    const [secondaryButtonLabel, setSecondaryButtonLabel] = useState("Close");
    const changeToGoBackButton = () => {
        setSecondaryButtonLabel("Back");
        setSecondaryButtonCloseState(false);
    }
    const changeToCloseButton = () => {
        setSecondaryButtonLabel("Close");
        setSecondaryButtonCloseState(true);
    }
    const secondaryButton = () => {
        if (secondaryButtonCloseState) {
            handleClose();
        } else {
            goBackApplication();
        }
    }

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
        'Employment History',
        'Supporting Documents',
    ];

    function PersonalInformation() {
        return (
            <Card sx={{ width: "100%", minHeight: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                <CardContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item xs={12}><Typography variant={"h5"}>To provide the best chance of a successful application, please provide us with some information about yourself.</Typography></Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: 'space-between', p: 1 }}>
                                <TextField required id="outlined-required" label="First Name" defaultValue="Hello World" />
                                <TextField required id="outlined-required" label="Last Name" defaultValue="Hello World" />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateField required label="Date of Birth" defaultValue={dayjs('2022-04-17')} />
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    // card for providing ID documents
    function IDDocuments() {
        return (
            <Card sx={{ width: "100%", minHeight: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                <CardContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item xs={12}><Typography variant={"h5"}>Thanks! Now moving onto your identification...</Typography></Grid>
                        <Grid item xs={12}><Typography variant={"body"}>Note: RentConnect currently only supports Australian Drivers License.</Typography></Grid>
                        <Grid item xs={6}>
                            <TextField required id="outlined-required" label="License Number" defaultValue="" />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField required label="Date of Expiry" />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    // card for providing employment history
    function EmploymentHistory() {
        return (
            <Card sx={{ width: "100%", minHeight: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                <CardContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item xs={12}><Typography variant={"h5"}>Getting closer, now where have you previously worked?</Typography></Grid>
                        <Grid item xs={12}><Typography variant={"body"}>For your application, RentConnect requires you to provide some information about your previous employment.</Typography></Grid>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            //value={age}
                                            label="Industry"
                                            //onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Academic Research</MenuItem>
                                            <MenuItem value={20}>Business Services</MenuItem>
                                            <MenuItem value={20}>Creative</MenuItem>
                                            <MenuItem value={30}>Corporate Professionals</MenuItem>
                                            <MenuItem value={30}>Financial or Real Estate</MenuItem>
                                            <MenuItem value={30}>Hospitality</MenuItem>
                                            <MenuItem value={30}>IT and Engineering</MenuItem>
                                            <MenuItem value={30}>Law or Public Sector</MenuItem>
                                            <MenuItem value={30}>Manufacturing or Retail</MenuItem>
                                            <MenuItem value={30}>Medical</MenuItem>
                                            <MenuItem value={30}>Skilled Labour</MenuItem>
                                            <MenuItem value={30}>Other or Unemployed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
                                        <Select disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            //value={age}
                                            label="Occupation"
                                            //onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Academic Research</MenuItem>
                                            <MenuItem value={20}>Business Services</MenuItem>
                                            <MenuItem value={20}>Creative</MenuItem>
                                            <MenuItem value={30}>Corporate Professionals</MenuItem>
                                            <MenuItem value={30}>Financial or Real Estate</MenuItem>
                                            <MenuItem value={30}>Hospitality</MenuItem>
                                            <MenuItem value={30}>IT and Engineering</MenuItem>
                                            <MenuItem value={30}>Law or Public Sector</MenuItem>
                                            <MenuItem value={30}>Manufacturing or Retail</MenuItem>
                                            <MenuItem value={30}>Medical</MenuItem>
                                            <MenuItem value={30}>Skilled Labour</MenuItem>
                                            <MenuItem value={30}>Other or Unemployed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField fullWidth required id="outlined-required" label="Employer Name" defaultValue="" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth required id="outlined-required" label="Employer Number" defaultValue="" />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth required id="outlined-required" label="Employer Email" defaultValue="" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Grid item xs={6}><Typography variant={"body1"}>Time with Current Employer</Typography></Grid>
                                    <Grid container spacing={2} style={{paddingTop: "5px"}}>
                                        <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TextField fullWidth required id="outlined-required" label="Years" defaultValue="" />
                                            </LocalizationProvider>                                </Grid>
                                        <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateField required label="Months" />
                                            </LocalizationProvider>                                </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid item xs={6}><Typography variant={"body1"}>After-tax Income</Typography></Grid>
                                    <Grid container spacing={2} style={{paddingTop: "5px"}}>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Frequency of Income</InputLabel>
                                                <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                    //value={age}
                                                        label="Frequency of Income"
                                                    //onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>Monthly</MenuItem>
                                                    <MenuItem value={20}>Fortnightly</MenuItem>
                                                    <MenuItem value={20}>Weekly</MenuItem>
                                                </Select>
                                            </FormControl>                            </Grid>
                                        <Grid item xs={6}>
                                            <TextField fullWidth required id="outlined-required" label="Income" defaultValue="" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    function ApplicationForm() {
        switch (stepperValue) {
            case 0: return <PersonalInformation />
            case 1: return <IDDocuments />
            case 2: return <EmploymentHistory />
            default: return <PersonalInformation />
        }
    }

    return (
        <div>
            <NavigationMenu>
        <React.Fragment>
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
                                                <Stepper activeStep={stepperValue} alternativeLabel>
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
                                        <ApplicationForm />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={secondaryButton}>{secondaryButtonLabel}</Button>
                        <Button variant="contained" onClick={primaryButton}>{primaryButtonLabel}</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </React.Fragment>
        </NavigationMenu>
        </div>
    );
}