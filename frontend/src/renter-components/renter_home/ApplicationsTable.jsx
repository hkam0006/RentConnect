import {
    Button, Chip,
    Stack,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ImgElement from "../../manager-components/property_page/ImgElement";
import ListingImage from './listing.jpg'
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React from "react";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const fullAddress = (number, name, type, suburb, state) => {
    return `${number} ${name} ${type}, ${suburb}, ${state}`
}

// for testing use
function createData(id, address, vacancy, attendees, applications, listingImage, type, price, available, bedrooms, bathrooms, car_spaces, propManager, applicationStatus) {
    return { id, address, vacancy, attendees, applications, listingImage, type, price, available, bedrooms, bathrooms, car_spaces, propManager, applicationStatus };
}

// for testing use
const defaultRows = [
    createData(crypto.randomUUID(), '1702/655 Chapel Street, South Yarra 3141', 25, 31, 15, ListingImage, "Apartment", "750 per week", "31st March 2024", 3, 3, 2, "Jensen Huang", "approved"),
    createData(crypto.randomUUID(), '123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "800 per week", "31st Feb 2024", 3, 2, 1, "Jensen Huang", "progress"),
    createData(crypto.randomUUID(), '52 Aperture Way, Eltham 3095', 30, 10, 13, ListingImage, "House", "800 per week", "31st Feb 2024", 1, 1, 0, "Elon Musk", "rejected"),
];


function ApplicationStatusChip(appStatus) {
    if (appStatus.appStatus === "approved") {
        return <Chip label="Approved" color="success"/>
    } else if (appStatus.appStatus === "rejected") {
        return <Chip label="Rejected" color="error"/>
    } else {
        return <Chip label="In Progress" color="info" variant="outlined"/>
    }
}

export default function ApplicationsTable() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "white",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
        },
    }));

    const navigate = useNavigate();

    return (
        <Table stickyHeader sx={{minWidth: 650}} aria-label="Table of properties">
            <TableHead>
                <TableRow>
                    <StyledTableCell><Typography fontSize={"12px"} fontWeight={700}>Property </Typography></StyledTableCell>
                    <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Application Status</Typography></StyledTableCell>
                    <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}></Typography></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {defaultRows.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell width={{width: "fit-content"}}>
                            {/* <Card sx={{ padding: 2, }} > */}
                            <Typography variant='body' fontWeight={700}>
                                {/*
                                {fullAddress(
                                    row.property_street_number,
                                    row.property_street_name,
                                    row.property_street_type,
                                    row.property_suburb,
                                    row.property_state
                                )
                                */}
                                {row.address}
                            </Typography>
                            <Stack direction='row' spacing={2} justifyContent="start" sx={{width: "fit-content"}}>
                                <ImgElement sx={{height: '150px', width: '264px', borderRadius: 3}}
                                            src={row.listingImage} alt='Stock Listing Image'/>
                                <Stack>
                                    <Stack direction='row' spacing={2}>
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <BedIcon/>
                                            <Typography alignContent="center" fontWeight={700}
                                                        variant='h6'>{/*{row.property_bedroom_count}*/}{row.bedrooms}</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <BathtubIcon/>
                                            <Typography alignContent="center" fontWeight={700}
                                                        variant='h6'>{/*{row.property_bathroom_count}*/}{row.bathrooms}</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <DirectionsCarIcon/>
                                            <Typography alignContent="center" fontWeight={700}
                                                        variant='h6'>{/*{row.property_car_spot_count}*/}{row.car_spaces}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Typography>${row.price} {row.property_rent_frequency}</Typography>
                                    <Typography>Type: {/*{row.property_type}*/}{row.price}</Typography>
                                    <Typography>Available: {/*{row.property_lease_start}*/}{row.available}</Typography>
                                </Stack>
                            </Stack>
                            {/* </Card> */}
                        </TableCell>
                        <TableCell align="right">
                            <ApplicationStatusChip appStatus={row.applicationStatus}/>
                        </TableCell>
                        <TableCell align="right">
                            <Stack spacing={1}>
                                <Button variant='contained'
                                        onClick={() => navigate(`/property/${row.property_id}`)}>View</Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}