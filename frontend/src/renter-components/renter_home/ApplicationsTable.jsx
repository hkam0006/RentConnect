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
import React, {useEffect, useMemo, useState} from "react";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import useGetPropertyByPropertyID from "../../queries/Property/useGetPropertyByPropertyID";
import useGetPropertiesByPropertyIDs from "../../queries/Property/useGetPropertiesByPropertyIDs";
import AppLoader from "../../manager-components/property_page/AppLoader";

const fullAddress = (number, name, type, suburb, state) => {
    return `${number} ${name} ${type}, ${suburb}, ${state}`
}

/**
 * A custom Chip which shows the application status. Required application status to be passed
 * as a parameter.
 *
 * @param {String} appStatus string containing status of the application
 * @returns {Chip} a customised Chip component
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
 * Table containing information about all applications made by a renter. Requires application
 * data to be passed as a parameter.
 *
 * @param applications an array containing all applications made by a renter
 * @author Luke Phillips
 */
export default function ApplicationsTable(applications) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "white",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
        },
    }));

    const navigate = useNavigate();

    // get all property IDs for all applications
    //const [propertyIDs, setPropertyIDs] = useState([]);
    const propertyIDs = useMemo(() => applications.applications?.map(application => application.property_id), [applications]);

    // get all relevant properties from DB and store in properties array
    const {properties, loading} = useGetPropertiesByPropertyIDs(propertyIDs);

    if (loading) return <AppLoader />

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
                {applications.applications?.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell width={{width: "fit-content"}}>
                            {/* <Card sx={{ padding: 2, }} > */}
                            <Typography variant='body' fontWeight={700}>
                                {fullAddress(
                                    properties[index].property_street_number,
                                    properties[index].property_street_name,
                                    properties[index].property_street_type,
                                    properties[index].property_suburb,
                                    properties[index].property_state
                                )}
                            </Typography>
                            <Stack direction='row' spacing={2} justifyContent="start" sx={{width: "fit-content"}}>
                                <ImgElement sx={{height: '150px', width: '264px', borderRadius: 3}}
                                            src={properties[index].property_pictures[0]} alt='Stock Listing Image'/>
                                <Stack>
                                    <Stack direction='row' spacing={2}>
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <BedIcon/>
                                            <Typography alignContent="center" fontWeight={700}
                                                        variant='h6'>{properties[index].property_bedroom_count}</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <BathtubIcon/>
                                            <Typography alignContent="center" fontWeight={700}
                                                        variant='h6'>{properties[index].property_bathroom_count}</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                                            <DirectionsCarIcon/>
                                            <Typography alignContent="center" fontWeight={700}
                                                        variant='h6'>{properties[index].property_car_spot_count}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Typography>${properties[index].price} {properties[index].property_rent_frequency}</Typography>
                                    <Typography>Type: {properties[index].property_type}</Typography>
                                    <Typography>Available: {properties[index].property_lease_start}</Typography>
                                </Stack>
                            </Stack>
                            {/* </Card> */}
                        </TableCell>
                        <TableCell align="right">
                            <ApplicationStatusChip appStatus={row.application_status}/>
                        </TableCell>
                        <TableCell align="right">
                            <Stack spacing={1}>
                                <Button variant='contained'
                                        onClick={() => navigate(`/application/${properties[index].property_id}`)}>View</Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}