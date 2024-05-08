import React, { useState } from 'react';
import ImgElement from '../property_page/ImgElement';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Box } from "@mui/material";
import { Bed as BedIcon, Bathtub as BathtubIcon, DirectionsCar as DirectionsCarIcon, Diversity1 } from '@mui/icons-material';
import { Fab } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddPropertyModal from '../property_page/AddPropertyModal';
import { useNavigate } from "react-router-dom";
import './bookmarked.css';

export function PropertiesListItems({ properties, handleAddProperties, propManagers }) {

  const [open, setOpen] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState(false); // Initially, show saved properties
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filter properties based on the appliedFilter state
  let filteredProperties = properties;
  if (appliedFilter) {
    // If appliedFilter is true, set filteredProperties to an empty array
    filteredProperties = [];
  }

  console.log("All Properties:", properties);
  return (
    <>
      {open && <AddPropertyModal handleClose={handleClose} handleAdd={handleAddProperties} rows={properties} propManagers={propManagers} />}
      <div >
      <Paper sx={{ 
maxWidth: 1/2
}}>
          <TableContainer sx={{ borderRadius: 3, height: "700px"}}>
            <Table stickyHeader aria-label="simple table" size='medium'>
              <TableHead  >
                <TableRow>
                  <Button onClick={() => setAppliedFilter(false)} variant={!appliedFilter ? 'contained' : 'outlined' } size="large" style={{marginLeft:"10px", marginTop: "10px"}}>
                    <Typography fontSize={"12px"} fontWeight={700}>
                      Saved
                    </Typography>
                  </Button>
                  <Button onClick={() => setAppliedFilter(true)} variant={appliedFilter ? 'contained' : 'outlined'} size="large" style={{marginLeft:"10px", marginTop: "10px"}}>
                    <Typography fontSize={"12px"} fontWeight={700}>
                      Applied
                    </Typography>
                  </Button>
                </TableRow>
              </TableHead>
              <TableBody >
                {filteredProperties.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    
                  >
                    <TableCell width={{ width: "fit-content" }}>
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
                          <Typography>Type: {row.type}</Typography>
                          <Typography>Available: {row.available}</Typography>
                          <Button variant='outlined' size='small' endIcon={<OpenInNewIcon />}>Apply Link</Button>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        <Button variant='contained' onClick={() => navigate(`/property/${row.id}`)}>View</Button>
                        <Button variant='outlined'>More</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
      </div>
    </>
  );
}
