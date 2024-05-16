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
import {useEffect, useReducer, useState} from "react";
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

    // react hook to force update if required
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    // setting values and functions for primary button
    const [primaryButtonNextState, setPrimaryButtonNextState] = React.useState(true);
    const [primaryButtonLabel, setPrimaryButtonLabel] = React.useState("Next");
    const primaryButton = () => {
        if (dataValidation()) {
            if (primaryButtonNextState) {
                progressApplication();
            } else {
                handleClose();
            }
        } else {
            forceUpdate();
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

    function dataValidation() {
        switch (stepperValue) {
            case 0: return personalInformationValidation()
            case 1: return IDDocumentsValidation()
            //case 2: return <EmploymentHistory />
            //case 3: return <SupportingDocuments />
            default: return false;
        }
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

    const [applicant, setApplicant] = React.useState({
        first_name: "John",
        last_name: "Smith",
        date_of_birth: "17/04/2002",
        mobile: "0485767462",
        email: "john.smith@example.com",
        license_number: "dsfgdsfg",
        license_expiry: "04/01/2034",
        industry: "",
        occupation: "",
        employer_name: "",
        employer_contact: "",
        employer_email: "",
        employment_time: 5.3,
        annual_income: 80000,
    });

    const [personalInformationErrors, setPersonalInformationErrors] = React.useState({
        first_name: false,
        last_name: false,
        date_of_birth: false,
        mobile: false,
        email: false,
    });

    const [IDDocumentErrors, setIDDocumentErrors] = React.useState({
        license_number: false,
        license_expiry: false,
    });

    // stepper string values
    const steps = [
        'Personal Information',
        'ID Documents',
        'Employment History',
        'Supporting Documents',
    ];

    function handleApplicantDataChange(newData, callback) {
        setApplicant(newData);

        if (callback && typeof callback === 'function') {
            callback();
        }
    }

    // functions for personal information section
    function PersonalInformation({formData, onFormChange, formErrors}) {
        const handleChange = (e) => {
            const { name, value } = e.target;
            // Update form data
            onFormChange({ ...formData, [name]: value }, personalInformationValidation());
            // run test
        };

        return (
            <Card sx={{ width: "100%", minHeight: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                <CardContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item xs={12}><Typography variant={"h5"}>To begin, tell us a bit about yourself.</Typography></Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField fullWidth required
                                               name="first_name"
                                               id="outlined-required"
                                               label="First Name"
                                               defaultValue={formData.first_name}
                                               onBlur={handleChange}
                                               error={formErrors.first_name}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth required
                                               name="last_name" id="outlined-required"
                                               label="Last Name" defaultValue={formData.last_name}
                                               onBlur={handleChange}
                                               error={formErrors.last_name}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateField required
                                                   name="date_of_birth" label="Date of Birth"
                                                   defaultValue={dayjs(formData.date_of_birth,'DD/MM/YYYY')} format="DD/MM/YYYY"
                                                   onBlur={handleChange}
                                                   error={formErrors.date_of_birth}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField fullWidth required
                                               name="mobile" id="outlined-required"
                                               label="Mobile Number" defaultValue={formData.mobile}
                                               onBlur={handleChange}
                                               error={formErrors.mobile}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth required
                                               name="email" id="outlined-required"
                                               label="Email Address" defaultValue={formData.email}
                                               onBlur={handleChange}
                                               error={formErrors.email}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    function personalInformationValidation() {
        if (applicant.first_name.trim() === "") {
            personalInformationErrors.first_name = true;
            return false;
        } else {
            personalInformationErrors.first_name = false;
        }

        if (applicant.last_name.trim() === "") {
            personalInformationErrors.last_name = true;
            return false;
        } else {
            personalInformationErrors.last_name = false;
        }

        if (!(dayjs(applicant.date_of_birth,'DD/MM/YYYY').isBefore(dayjs()))) {
            personalInformationErrors.date_of_birth = true;
            return false;
        } else {
            personalInformationErrors.date_of_birth = false;
        }

        if (!(/^04\d{8}$/.test(applicant.mobile))) { // all numbers, starts with 04 and 10 characters long
            personalInformationErrors.mobile = true;
            return false;
        } else {
            personalInformationErrors.mobile = false;
        }

        if (applicant.email.trim() === "") {
            personalInformationErrors.email = true;
            return false;
        } else {
            personalInformationErrors.email = false;
            return true;
        }
    }

    // card for providing ID documents
    function IDDocuments({formData, onFormChange, formErrors}) {
        const handleChange = (e) => {
            const { name, value } = e.target;
            // Update form data
            onFormChange({ ...formData, [name]: value }, IDDocumentsValidation());
            // run test
        };

        return (
            <Card sx={{ width: "100%", minHeight: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                <CardContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item xs={12}><Typography variant={"h5"}>Thanks! Now moving onto your identification...</Typography></Grid>
                        <Grid item xs={12}><Typography variant={"body"}>Note: RentConnect currently only supports Australian Drivers License.</Typography></Grid>
                        <Grid item xs={6}>
                            <TextField required
                                       name="license_number"
                                       id="outlined-required" label="License Number"
                                       onBlur={handleChange}
                                       defaultValue={formData.license_number}
                                       error={formErrors.license_number}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField required
                                           name="license_expiry" label="Date of Expiry"
                                           defaultValue={dayjs(formData.license_expiry,'DD/MM/YYYY')}
                                           onBlur={handleChange}
                                           error={formErrors.license_expiry}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    function IDDocumentsValidation() {
        if (!(/^\d+$/.test(applicant.license_number))) { // all numbers
            IDDocumentErrors.license_number = true;
            return false
        } else {
            IDDocumentErrors.license_number = false;
        }

        if (dayjs(applicant.license_expiry,'DD/MM/YYYY').isBefore(dayjs())) {
            IDDocumentErrors.license_expiry = true;
            return false;
        } else {
            IDDocumentErrors.license_expiry = false;
            return true;
        }
    }

    // card for providing employment history
    function EmploymentHistory({formData, onFormChange, formErrors}) {
        const [occupationIndustry, setOccupationIndustry] = useState("");
        const [employmentYears, setEmploymentYears] = useState(0);
        const [employmentMonths, setEmploymentMonths] = useState(0);
        const [incomeFrequency, setIncomeFrequency] = useState("");

        const handleChange = (e) => {
            const { name, value } = e.target;
            // Update form data
            onFormChange({ ...formData, [name]: value }, IDDocumentsValidation());
            // run test
        };

        const handleEmploymentTimeChange = (e) => {
            const { name, value } = e.target;

            if (!(/^\d+$/.test(value))) { // not a valid number
                formErrors.employment_time = true;
                return;
            }

            if (name === "employment_year") {
                setEmploymentYears(value);
            } else {
                setEmploymentMonths(value)
            }

            const employmentTime = employmentYears + (1 / 12 * employmentMonths);
            onFormChange({ ...formData, ["employment_time"]: employmentTime }, EmploymentHistoryValidation());
        }

        const handleIncomeFrequencyChange = (e) => {
            setIncomeFrequency(e.target.value);
        }

        const handleIncomeValueChange = (e) => {
            const incomePerFrequency = e.target.value;

            let income = 0;
            let incomePerFrequencyInt;

            if (!(/^\d+$/.test(incomeFrequency))) { // not a valid number
                formErrors.income = true;
                return;
            }

            incomePerFrequencyInt = parseInt
            if (incomeFrequency === "monthly") {
                income = incomePerFrequency * 12;
            } else if (incomeFrequency === "fortnightly") {
                income = incomePerFrequency * 26;
            } else {
                income = incomePerFrequency * 52;
            }

            onFormChange({ ...formData, ["income"]: income }, EmploymentHistoryValidation());
        }

        function occupationIndustryChange(e) {
            setOccupationIndustry(e.target.value);
            handleChange(e)
        }

        function getOccupationList() {
            const academicOptions = [
                {label: "Historian", value: "historian"}, {label: "Lab Technician", value: "labtech"}, {label: "Librarian", value: "librarian"},
                {label: "Researcher", value: "researcher"}, {label: "Scientist/Mathematician", value: "scientist"}, {label: "Teacher", value: "teacher"},
                {label: "University Lecturer/Teacher", value: "lecturer"},
            ];

            const businessOptions = [
                {label: "Account Manager", value: "accmanager"}, {label: "Admin/Data-entry/Secretary", value: "admin"}, {label: "Business Trainer", value: "trainer"},
                {label: "Clerical Worker", value: "clerical"}, {label: "Consultant", value: "consultant"}, {label: "Customer Service Consultant", value: "customerservice"},
                {label: "Instructor", value: "instructor"}, {label: "Sales/Marketing/Advertising", value: "sales"}, {label: "Sales Representative", value: "salesrep"},
                {label: "Travel Agent/Consultant", value: "travel"},
            ];

            const creativeOptions = [
                {label: "Actor/Performer", value: "actor"}, {label: "Architect", value: "architect"}, {label: "Artist/Designer/Illustrator", value: "artist"},
                {label: "Journalist/Proofreader", value: "journalist"}, {label: "Landscape Architect", value: "landscape"}, {label: "Musician", value: "musician"},
                {label: "Sound Tech", value: "soundtech"}, {label: "Writer/Editor", value: "writer"},
            ];

            const corporateOptions = [
                {label: "Executive", value: "exec"}, {label: "HR/Recruitment", value: "hr"}, {label: "Manager/Supervisor", value: "manager"},
                {label: "Public Relations", value: "pr"},
            ];

            const financialOptions = [
                {label: "Accountant", value: "accountant"}, {label: "Building/Construction Manager", value: "building"}, {label: "Bursar", value: "bursar"},
                {label: "Caretaker/Janitor", value: "caretaker"}, {label: "Insurance/Banking", value: "insurance"}, {label: "Real Estate/Property", value: "realestate"},
            ];

            const hospitalityOptions = [
                {label: "Baker/Pastry Cook/Chef", value: "chef"}, {label: "Catering/Restaurant Manager", value: "catering"}, {label: "Dishwasher/Kitchenhand", value: "dishwasher"},
                {label: "Hospitality", value: "hospitality"}, {label: "Hotel Manager/Supervisor", value: "hotelmanager"},
            ];

            const itOptions = [
                {label: "Electrical/Electronic Engineer", value: "elecengineer"}, {label: "Engineer", value: "engineer"}, {label: "IT Professional", value: "itprof"},
                {label: "Maintenance Engineer", value: "maintenance"},
            ];

            const lawOptions = [
                {label: "Barrister/Solicitor", value: "barrister"}, {label: "Coroner/Judge/Magistrate", value: "coroner"}, {label: "Customs Agent", value: "customs"},
                {label: "Defence Forces", value: "defence"}, {label: "Fire Brigade/Police", value: "firepolice"}, {label: "Legal Officer", value: "legalofficer"},
                {label: "Politician", value: "politician"}, {label: "Public Servant", value: "publicservant"}, {label: "Safety Inspector", value: "inspector"},
                {label: "Security Services/Officer", value: "security"}, {label: "Social Worker", value: "socialworker"},
            ];

            const manufacturingOptions = [
                {label: "Assembler", value: "assembler"}, {label: "Cashier", value: "cashier"}, {label: "Driver/Operator", value: "driver"},
                {label: "Importer/Exporter", value: "importexport"}, {label: "Labour/Factory Worker/Process Worker", value: "labour"}, {label: "Logistics", value: "logistics"},
                {label: "Production", value: "production"}, {label: "Retail/Small Business Manager", value: "retailmanager"}, {label: "Wholesale Manager", value: "wholesale"},
            ];

            const medicalOptions = [
                {label: "Ambulance Officer/Manager", value: "ambulance"}, {label: "Doctor/Specialist/Surgeon", value: "doctor"}, {label: "Medical Lab Tech", value: "medicallab"},
                {label: "Nurse/Midwife", value: "nurse"}, {label: "Pharmacist", value: "pharmacist"}, {label: "Veterinarian", value: "vet"},
            ];

            const labourOptions = [
                {label: "Air Traffic Controller", value: "atc"}, {label: "Butcher/Smallgoods", value: "butcher"}, {label: "Childcare/Youth Worker", value: "childcare"},
                {label: "Construction Worker", value: "construction"}, {label: "Farmer", value: "farmer"}, {label: "Gardener/Landscaper", value: "gardener"},
                {label: "Greenkeeper/Groundsperson", value: "greenkeeper"}, {label: "Mechanic", value: "mechanic"}, {label: "Nursery and Garden Labourer", value: "nursery"},
                {label: "Tradesperson", value: "trades"}, {label: "Translator", value: "translator"},
            ];

            const otherOptions = [
                {label: "Home Duties", value: "homeduties"}, {label: "Professional Sportsperson", value: "sports"}, {label: "Retired", value: "retired"},
                {label: "Self-Employed", value: "selfemployed"}, {label: "Sole Trader", value: "soletrader"}, {label: "Student", value: "student"},
                {label: "Unemployed", value: "unemployed"}, {label: "Volunteer Work", value: "volunteer"},
            ];

            switch (occupationIndustry) {
                case "academic":
                    return academicOptions;
                case "business":
                    return businessOptions;
                case "creative":
                    return creativeOptions;
                case "corporate":
                    return corporateOptions;
                case "financial":
                    return financialOptions;
                case "hospitality":
                    return hospitalityOptions;
                case "it":
                    return itOptions;
                case "law":
                    return lawOptions;
                case "manufacturing":
                    return manufacturingOptions;
                case "medical":
                    return medicalOptions;
                case "labour":
                    return labourOptions;
                case "other":
                    return otherOptions;
                default:
                    return otherOptions;
            }
        }

        // generates the select form for the occupation select
        function OccupationSelect() {

            if (occupationIndustry === "") {
                return <Select disabled label={"Occupation"}></Select>
            } else {
                const occupationList = getOccupationList();

                return (
                    <Select
                        labelId="demo-simple-select-label" id="demo-simple-select"
                        name={"occupation"} label="Occupation"
                        defaultValue={formData.occupation}
                        onChange={handleChange}
                        error={formErrors.occupation}
                    >
                        {occupationList.map((option) => (
                            <MenuItem value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                );
            }
        }

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
                                            labelId="demo-simple-select-label" id="demo-simple-select"
                                            name={"industry"}
                                            defaultValue={formData.industry}
                                            label="Industry"
                                            onChange={occupationIndustryChange}
                                        >
                                            <MenuItem value={"academic"}>Academic Research</MenuItem>
                                            <MenuItem value={"business"}>Business Services</MenuItem>
                                            <MenuItem value={"creative"}>Creative</MenuItem>
                                            <MenuItem value={"corporate"}>Corporate Professionals</MenuItem>
                                            <MenuItem value={"financial"}>Financial or Real Estate</MenuItem>
                                            <MenuItem value={"hospitality"}>Hospitality</MenuItem>
                                            <MenuItem value={"it"}>IT and Engineering</MenuItem>
                                            <MenuItem value={"law"}>Law or Public Sector</MenuItem>
                                            <MenuItem value={"manufacturing"}>Manufacturing or Retail</MenuItem>
                                            <MenuItem value={"medical"}>Medical</MenuItem>
                                            <MenuItem value={"labour"}>Skilled Labour</MenuItem>
                                            <MenuItem value={"other"}>Other or Unemployed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
                                        <OccupationSelect />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField fullWidth required
                                               id="outlined-required" label="Employer Name"
                                               name={"employer_name"}
                                               defaultValue={formData.employer_name}
                                               onBlur={handleChange}
                                               error={formErrors.employer_name}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth required
                                               id="outlined-required" label="Employer Number"
                                               name={"employer_contact"}
                                               defaultValue={formData.employer_contact}
                                               onBlur={handleChange}
                                               error={formErrors.employer_contact}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth required
                                               id="outlined-required" label="Employer Email"
                                               name={"employer_email"}
                                               defaultValue={formData.employer_email}
                                               onBlur={handleChange}
                                               error={formErrors.employer_email}
                                    />
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
                                                <TextField fullWidth required
                                                           id="outlined-required" label="Years"
                                                           name={"employment_years"}
                                                           onBlur={handleEmploymentTimeChange}
                                                           error={formErrors.employment_time}
                                                />
                                            </LocalizationProvider>                                </Grid>
                                        <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateField required
                                                           label="Months" name={"employment_months"}
                                                           onBlur={handleEmploymentTimeChange}
                                                           error={formErrors.employment_time}
                                                />
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
                                                        label="Frequency of Income"
                                                        onChange={handleIncomeFrequencyChange}
                                                        error={formErrors.income}
                                                >
                                                    <MenuItem value={"monthly"}>Monthly</MenuItem>
                                                    <MenuItem value={"fortnightly"}>Fortnightly</MenuItem>
                                                    <MenuItem value={"weekly"}>Weekly</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField fullWidth required
                                                       id="outlined-required" label="Income"
                                                       onChange={handleIncomeValueChange}
                                                       error={formErrors.income}
                                            />
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

    /*
    function EmploymentHistoryValidation() {
        if (applicant.)
    } */

    function SupportingDocuments() {
        return (
            <Card sx={{ width: "100%", minHeight: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                <CardContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item xs={12}><Typography variant={"h5"}>Almost done! Just the final touches...</Typography></Grid>
                        <Grid item xs={12}><Typography variant={"body"}>If you have any additional supporting documents, enter the URL below.</Typography></Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth required id="outlined-required" label="Document URL" defaultValue="" />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    function ApplicationForm() {
        switch (stepperValue) {
            case 0: return <PersonalInformation formData={applicant} onFormChange={handleApplicantDataChange} formErrors={personalInformationErrors} />
            case 1: return <IDDocuments formData={applicant} onFormChange={handleApplicantDataChange} formErrors={IDDocumentErrors} />
            case 2: return <EmploymentHistory formData={applicant} onFormChange={handleApplicantDataChange} formErrors={IDDocumentErrors}/>
            case 3: return <SupportingDocuments />
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