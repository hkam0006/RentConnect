import React, { useState } from 'react'
import ImgElement from './ImgElement';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Card, tableCellClasses } from "@mui/material"
import { styled } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

// Demo Images
import ListingImage from './listing.jpg'
import ListingImageApt from './listing2.jpg'
import AddPropertyModal from './AddPropertyModal';


export function PropertiesTable() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function createData(address, vacancy, attendees, applications, listingImage, type, price, available, bedrooms, bathrooms, car_spaces) {
    return { address, vacancy, attendees, applications, listingImage, type, price, available, bedrooms, bathrooms, car_spaces };
  }

  const defaultRows = [
    createData('1702/655 Chapel Street, South Yarra 3141', 25, 31, 15, ListingImageApt, "Apartment", "750 per week", "31st March 2024", 3, 3, 2),
    createData('123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "800 per week", "31st Feb 2024", 3, 2, 1),
    createData('123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "800 per week", "31st Feb 2024", 1, 1, 0),
  ];

  const [rows, setRows] = useState(defaultRows)

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
    {open && <AddPropertyModal handleClose={handleClose} handleAdd={setRows} rows={rows} />}
    {rows.length > 0 ? <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3, height: "700px" }}>
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
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Card sx={{ padding: 2, }} >
                  <Typography variant='body' fontWeight={700}>{row.address}</Typography>
                  <Stack direction='row' spacing={2} justifyContent="start" sx={{ width: "fit-content" }} >
                    <ImgElement sx={{ height: '150px', width: '264px', borderRadius: 3 }} src={row.listingImage} alt='Stock Listing Image' />
                    <Stack>
                      <Stack direction='row' spacing={2}>
                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                          <BedIcon />
                          <Typography alignContent="center" variant='h6'>{row.bedrooms}</Typography>
                        </Stack>
                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                          <BathtubIcon />
                          <Typography alignContent="center" variant='h6'>{row.bathrooms}</Typography>
                        </Stack>
                        <Stack direction='row' spacing={0.5} alignItems={"center"}>
                          <DirectionsCarIcon />
                          <Typography alignContent="center" variant='h6'>{row.car_spaces}</Typography>
                        </Stack>
                      </Stack>
                      <Typography>${row.price} {row.payFreq}</Typography>
                      <Typography>Apartment Type: {row.type}</Typography>
                      <Typography>Available: {row.available}</Typography>
                      <Typography>Apply Link</Typography>
                    </Stack>
                  </Stack>
                </Card>
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
