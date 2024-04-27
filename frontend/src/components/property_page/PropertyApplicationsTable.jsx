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
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Match Score</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Name</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Ratio</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Inspected Date</Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Status</Typography></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right"><Typography variant='h6'>{row.matchScore}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>{row.name}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'> {row.rentToIncomeRatio}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>{row.inspectedDate}</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6'>{row.status}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
    </Paper>}
  </>
}
