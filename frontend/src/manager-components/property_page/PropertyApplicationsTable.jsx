import React, { useState, useEffect } from 'react'
import { Table, TableBody, Checkbox, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Button, Card, tableCellClasses, Box } from "@mui/material"
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import RenterNameCell from './RenterNameCell';


export function PropertyApplicationsTable({ applications }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const navigate = useNavigate();

  return <>
    {applications.length > 0 ? <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3 }}>
      <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell></StyledTableCell> */}
            <StyledTableCell align="center"><Typography variant='h6'>Applied On</Typography></StyledTableCell>
            <StyledTableCell align="left"><Typography variant='h6' >Name</Typography></StyledTableCell>
            <StyledTableCell align="left"><Typography variant='h6' >Persons</Typography></StyledTableCell>
            <StyledTableCell align="left"><Typography variant='h6'>Proposed Start Date</Typography></StyledTableCell>
            <StyledTableCell align="left"><Typography variant='h6'>Status</Typography></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell><Checkbox /></TableCell> */}
              <TableCell align="center"><Typography>{row.application_apply_date}</Typography></TableCell>
              <TableCell align="left">
                <RenterNameCell renterId={row.renter_id} />
              </TableCell>
              <TableCell align="left"><Typography> {row.application_adults_number}</Typography></TableCell>
              <TableCell align="left"><Typography>{row.application_lease_start}</Typography></TableCell>
              <TableCell align="left"><Typography>{row.application_status}</Typography></TableCell>
              <TableCell align="center"><Button variant='outlined' size='medium' onClick={() => navigate(`/ApplicationDetails/${row.company_id}/${row.property_id}/${row.renter_id}`)}>View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
    </Paper>}
  </>
}
