import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, tableCellClasses, Box } from "@mui/material"
import { styled } from '@mui/material/styles';
import InspectionRequestModal from './InspectionRequestModal';

export function UpcomingViewingsTable({ viewings, property }) {

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

    // For request inspection modal
    const [inspectionRequestOpen, setInspectionRequestOpen] = useState(false);
    const [inspectionRequestData, setInspectionRequestData] = useState(property);
    const handleInspectionRequestOpen = () => setInspectionRequestOpen(true);
    const handleInspectionRequestClose = () => setInspectionRequestOpen(false);

    // Edit modal submit functionality
    const handleInspectionRequestSubmit = () => {
        console.log("Viewing request submitted ", inspectionRequestData);
        // Foer editting, handle database changes here
        handleInspectionRequestClose();
    };

    // If there are no viewings, do not show the table
    if ( viewings.length == 0 ) {
        return <>
                {inspectionRequestOpen && (
                    <InspectionRequestModal
                        open={inspectionRequestOpen}
                        handleClose={handleInspectionRequestClose} 
                        data={inspectionRequestData}
                        setData={setInspectionRequestData}
                        handleSubmit={handleInspectionRequestSubmit}
                    />
                )}
                <Typography>
                    Sorry, there are no advertised open home times. Please request a viewing with the agent.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <Button
                    onClick={() => handleInspectionRequestOpen()}
                    sx={{ mt: 1 }} 
                    variant='outlined' size='medium'>Request a viewing</Button>
                </Box>
        </>
    }
  
    return <>
            {viewings.length > 0 ? <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3 }}>
                <Table stickyHeader sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"><Typography variant='h6'>Date</Typography></StyledTableCell>
                            <StyledTableCell align="left"><Typography variant='h6' >Time</Typography></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {viewings.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center"><Typography>{row.date}</Typography></TableCell>
                            <TableCell align="left"><Typography>{row.time}</Typography></TableCell>
                            <TableCell align="center"><Button variant='outlined' size='medium'>View</Button></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
        </Paper>}
    </>
}