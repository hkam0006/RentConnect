import React from 'react'
import ImgElement from './ImgElement';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Card, tableCellClasses } from "@mui/material"
import { styled } from '@mui/material/styles';
import { FaBath, FaCar, FaBed } from "react-icons/fa6";

// Demo Images
import ListingImage from './listing.jpg'
import ListingImageApt from './listing2.jpg'


export function PropertiesTable() {

  function createData(name, vacancy, attendees, applications, listingImage, type, price, available) {
    return { name, vacancy, attendees, applications, listingImage, type, price, available };
  }

  const rows = [
    createData('1702/655 Chapel Street, South Yarra 3141', 25, 31, 15, ListingImageApt, "Apartment", "$750 per week", "31st March 2024"),
    createData('123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "$800 per week", "31st Feb 2024"),
    createData('123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "$800 per week", "31st Feb 2024"),
    createData('123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "$800 per week", "31st Feb 2024"),
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#5c4db1",
      color: "white"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3, height: "550px" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell><Typography fontSize={"12px"} fontWeight={700}>Property</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Vacancy (DoM)</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Attendees</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Applications</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}></Typography></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Card sx={{ padding: 2, }} >
                  <Typography variant='body' fontWeight={700}>{row.name}</Typography>
                  <Stack direction='row' spacing={2} justifyContent="start" sx={{ width: "fit-content" }} >
                    <ImgElement sx={{ height: '150px', width: '264px', borderRadius: 3 }} src={row.listingImage} alt='Stock Listing Image' />
                    <Stack>
                      <Stack direction='row' spacing={2}>
                        <Typography variant='h6'><FaBed /> 2</Typography>
                        <Typography variant='h6'><FaBath /> 2</Typography>
                        <Typography variant='h6'><FaCar /> 2</Typography>
                      </Stack>
                      <Typography>{row.price}</Typography>
                      <Typography>Apartment Type: {row.type}</Typography>
                      <Typography>Available: {row.available}</Typography>
                      <Typography>Apply Link</Typography>
                    </Stack>
                  </Stack>
                </Card>
              </TableCell>
              <TableCell align="right">{row.vacancy}</TableCell>
              <TableCell align="right">{row.attendees}</TableCell>
              <TableCell align="right">{row.applications}</TableCell>
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
    </TableContainer>
  )
}
