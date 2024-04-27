import React, { useState } from 'react'
import ImgElement from './ImgElement';
import { Table, TableBody, Checkbox, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Card, tableCellClasses, Box } from "@mui/material"
import { styled } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddPropertyModal from './AddPropertyModal';
import { green } from '@mui/material/colors';


export function PropertyApplicationsTable({ applications }) {

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

  return <>
    {applications.length > 0 ? <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3 }}>
      <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right"><Typography variant='h6'>Match Score</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography variant='h6' >Name</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography variant='h6' >Ratio</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography variant='h6'>Inspected Date</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography variant='h6'>Status</Typography></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell><Checkbox /></TableCell>
              <TableCell align="right"><Typography>{row.matchScore}</Typography></TableCell>
              <TableCell align="right"><Typography>{row.name}</Typography></TableCell>
              <TableCell align="right"><Typography> {row.rentToIncomeRatio}</Typography></TableCell>
              <TableCell align="right"><Typography>{row.inspectedDate}</Typography></TableCell>
              <TableCell align="right"><Typography>{row.status}</Typography></TableCell>
              <TableCell align="right"><Button variant='outlined' size='medium'>View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
    </Paper>}
  </>
}
