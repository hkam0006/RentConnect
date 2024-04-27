import React, { useState } from 'react'
import ImgElement from './ImgElement';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Card, tableCellClasses, Box } from "@mui/material"
import { styled } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddPropertyModal from './AddPropertyModal';


export function PropertiesTable({ properties, handleAddProperties, propManagers }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
      // color: "white"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  return <>
    {open && <AddPropertyModal handleClose={handleClose} handleAdd={handleAddProperties} rows={properties} propManagers={propManagers} />}
    {properties.length > 0 ? <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3, height: "700px" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
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
                <Typography variant='body' fontWeight={700}>{row.address}</Typography>
                <Stack direction='row' spacing={2} justifyContent="start" sx={{ width: "fit-content" }} >
                  <ImgElement sx={{ height: '150px', width: '264px', borderRadius: 3 }} src={row.listingImage} alt='Stock Listing Image' />
                  <Stack>
                    <Stack direction='row' spacing={2}>
                      <Stack direction='row' spacing={0.5} alignItems={"center"}>
                        <BedIcon />
                        <Typography alignContent="center" fontWeight={700} variant='h6'>{row.bedrooms}</Typography>
                      </Stack>
                      <Stack direction='row' spacing={0.5} alignItems={"center"}>
                        <BathtubIcon />
                        <Typography alignContent="center" fontWeight={700} variant='h6'>{row.bathrooms}</Typography>
                      </Stack>
                      <Stack direction='row' spacing={0.5} alignItems={"center"}>
                        <DirectionsCarIcon />
                        <Typography alignContent="center" fontWeight={700} variant='h6'>{row.car_spaces}</Typography>
                      </Stack>
                    </Stack>
                    <Typography>${row.price} {row.payFreq}</Typography>
                    <Typography>Apartment Type: {row.type}</Typography>
                    <Typography>Available: {row.available}</Typography>
                    <Button variant='outlined' size='small' endIcon={<OpenInNewIcon />}>Apply Link</Button>
                  </Stack>
                </Stack>
                {/* </Card> */}
              </TableCell>
              <TableCell align="right"><Typography variant='h6'>{row.vacancy}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'> {row.attendees}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>{row.applications}</Typography></TableCell>
              <TableCell align="right">
                <Stack spacing={1}>
                  <Button variant='contained'>View</Button>
                  <Button variant='outlined'>More</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack sx={{ position: "sticky", bottom: "10px" }} alignItems="center">
        <Fab color="primary" aria-label="add" onClick={() => handleOpen()}>
          <AddIcon />
        </Fab>
      </Stack>
    </TableContainer> : <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
      <Stack textAlign='center'>
        <Typography variant='h6'>Looks like you don't have any properties yet.</Typography>
        <Typography variant='subtitle'>Add your first property now!</Typography>
        <Button
          sx={{ margin: "auto", mt: 2 }}
          variant='contained'
          onClick={() => handleOpen()}
          startIcon={<AddIcon />}
        >
          Add Property
        </Button>
      </Stack>
    </Paper>}
  </>
}
