import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material"


export function PropertiesTable() {

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Property 1', 159, 6.0, 24, 4.0),
    createData('Property 2', 237, 9.0, 37, 4.3),
    createData('Property 3', 262, 16.0, 24, 6.0),
    createData('Property 4', 305, 3.7, 67, 4.3),
    createData('Property 5', 356, 16.0, 49, 3.9),
  ];
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography fontSize={"12px"} fontWeight={700}>Property</Typography></TableCell>
            <TableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Vacancy (DoM)</Typography></TableCell>
            <TableCell align="right"><Typography fontWeight={700} fontSize={"12px"} >Attendees</Typography></TableCell>
            <TableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Applications</Typography></TableCell>
            <TableCell align="right"><Typography fontWeight={700} fontSize={"12px"}>Something</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
