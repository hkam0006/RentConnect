import React from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus'
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Stack, Button, Chip } from '@mui/material'

const Keys = () => {
  return (
    <NavigationMenu>
      <Box sx={{ mt: "70px", padding: "20px", width: "100%" }}>
        <Stack direction='row' sx={{ justifyContent: "space-between", padding: "7px", alignItems: "center" }}>
          <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant='h4'>Keys</Typography>
            <TextField variant='standard' placeholder='Search property...' />
          </Stack>
          <Button variant='contained' sx={{ borderRadius: "20px" }}>Add Key</Button>
        </Stack>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ebeaea" }}>
              <TableRow>
                <TableCell><Typography variant='subtitle1' fontWeight={700}>Status</Typography></TableCell>
                <TableCell align="left"><Typography variant='subtitle1' fontWeight={700}>Key Set</Typography></TableCell>
                <TableCell align="left"><Typography variant='subtitle1' fontWeight={700} > Issued </Typography ></TableCell>
                <TableCell align="left"><Typography variant='subtitle1' fontWeight={700}>Due</Typography></TableCell>
                <TableCell align="left"><Typography variant='subtitle1' fontWeight={700}>Property Address</Typography></TableCell>
                <TableCell align="left"><Typography variant='subtitle1' fontWeight={700}>Property Manager</Typography></TableCell>
                <TableCell align="left"><Typography variant='subtitle1' fontWeight={700}>Borrower</Typography></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><Chip variant='filled' label='On Loan' color='info' /></TableCell>
                <TableCell>SY001</TableCell>
                <TableCell>31 March 24</TableCell>
                <TableCell>7 April 24</TableCell>
                <TableCell>7 Park St, South Yarra</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell align='right'><Button variant='outlined' style={{ borderWidth: "3px", borderRadius: "20px" }}>Check In</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Chip variant='filled' label='Returned' color='primary' /></TableCell>
                <TableCell>SY001</TableCell>
                <TableCell>31 March 24</TableCell>
                <TableCell>7 April 24</TableCell>
                <TableCell>7 Park St, South Yarra</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell align='right'><Button variant='contained' style={{ borderWidth: "3px", borderRadius: "20px" }}>Check Out</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Chip variant='filled' label='Added' color='info' /></TableCell>
                <TableCell>SY001</TableCell>
                <TableCell>31 March 24</TableCell>
                <TableCell>7 April 24</TableCell>
                <TableCell>7 Park St, South Yarra</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell align='right'><Button variant='outlined' style={{ borderWidth: "3px", borderRadius: "20px" }}>Check In</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </NavigationMenu >
  )
}

export default Keys
