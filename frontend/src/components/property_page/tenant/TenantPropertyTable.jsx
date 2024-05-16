import React, { useEffect, useState } from 'react'
import ImgElement from '../ImgElement';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Card, tableCellClasses, Box } from "@mui/material"
import { styled } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddPropertyModal from '../AddPropertyModal';
import { useNavigate } from "react-router-dom"
import { supabase } from '../../../supabase';
import { getApp } from 'firebase/app';

const fullAddress = (number, name, type, suburb, state) => {
  return `${number} ${name} ${type}, ${suburb}, ${state}`
}

export function TenantPropertiesTable({ properties, handleAddProperties, propManagers, setProperties }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const getApplicationNumber = async (property_id) => {
    const { data, error } = await supabase
      .from("APPLICATION")
      .select("*")
      .eq("property_id", property_id)
    return data
  }

  const navigate = useNavigate();

  return <>
    {open && <AddPropertyModal handleClose={handleClose} handleAdd={handleAddProperties} rows={properties} propManagers={propManagers} />}
    {properties.length > 0 ? <TableContainer sx={{ borderRadius: 3, height: "700px" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="Table of properties" >
        <TableHead>
          <TableRow>
            <StyledTableCell><Typography fontSize={"12px"} fontWeight={700}>Property </Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Vacancy (DoM)</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Attendees</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Applications</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}></Typography></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell width={{ width: "fit-content" }}>
                {/* <Card sx={{ padding: 2, }} > */}
                <Typography variant='body' fontWeight={700}>
                  {fullAddress(
                    row.property_street_number,
                    row.property_street_name,
                    row.property_street_type,
                    row.property_suburb,
                    row.property_state
                  )}
                </Typography>
                <Stack direction='row' spacing={2} justifyContent="start" sx={{ width: "fit-content" }} >
                  <ImgElement sx={{ height: '150px', width: '264px', borderRadius: 3 }} src={row.property_pictures[0]} alt='Stock Listing Image' />
                  <Stack>
                    <Stack direction='row' spacing={2}>
                      <Stack direction='row' spacing={0.5} alignItems={"center"}>
                        <BedIcon />
                        <Typography alignContent="center" fontWeight={700} variant='h6'>{row.property_bedroom_count}</Typography>
                      </Stack>
                      <Stack direction='row' spacing={0.5} alignItems={"center"}>
                        <BathtubIcon />
                        <Typography alignContent="center" fontWeight={700} variant='h6'>{row.property_bathroom_count}</Typography>
                      </Stack>
                      <Stack direction='row' spacing={0.5} alignItems={"center"}>
                        <DirectionsCarIcon />
                        <Typography alignContent="center" fontWeight={700} variant='h6'>{row.property_car_spot_count}</Typography>
                      </Stack>
                    </Stack>
                    <Typography>${row.price} {row.property_rent_frequency}</Typography>
                    <Typography>Type: {row.property_type}</Typography>
                    <Typography>Available: {row.property_lease_start}</Typography>
                    <Button variant='outlined' size='small' endIcon={<OpenInNewIcon />}>Apply Link</Button>
                  </Stack>
                </Stack>
                {/* </Card> */}
              </TableCell>
              <TableCell align="right"><Typography variant='h6'>{Math.round((new Date() - new Date(row.property_listing_date)) / (1000 * 3600 * 24))}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'> {row.property_attendees}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>{row.application_count}</Typography></TableCell>
              <TableCell align="right">
                <Stack spacing={1}>
                  <Button variant='contained' onClick={() => navigate(`/tenant/property/testID`)}>View</Button>
                  <Button variant='outlined'>More</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack sx={{ position: "sticky", bottom: "10px" }} alignItems="center">
      </Stack>
    </TableContainer> : <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
      <Stack textAlign='center'>
      </Stack>
    </Paper>}
  </>
}
