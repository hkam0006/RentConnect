import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const rows = [
    { name: 'John Doe', Email: 'JDog@gmail.com', Phone: '0412 345 678', Message: <Button variant="contained">Message</Button>},
    { name: 'Micheal Michealson', Email: 'MnM@hotmail.com', Phone: '0487 654 321', Message: <Button variant="contained">Message</Button>},
    { name: 'Bruce Wayne', Email: 'therealbatman@yahoo.com', Phone: '0422 286 266', Message: <Button variant="contained">Message</Button>},
];

const Contacts = () => {
  return (
    <div>
      <h1>Contacts</h1>
      <p>Here are the contacts</p>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <TableContainer component={Paper} sx={{ minWidth: 800 , maxWidth: 1100}}>
      <Table sx={{ minWidth: 800 , maxWidth: 1100}} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="right"></TableCell>
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
              <TableCell align="left">{row.Email}</TableCell>
              <TableCell align="left">{row.Phone}</TableCell>
              <TableCell align="right">{row.Message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
};

export default Contacts;