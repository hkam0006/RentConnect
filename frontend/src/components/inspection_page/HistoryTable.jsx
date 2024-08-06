import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material";
import Image from "./Image";

const fullAddress = (number, name, suburb, state) => {
  return `${number} ${name}, ${suburb}, ${state}`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const HistoryTable = ({ inspectionsData }) => {
  const historyInspections = inspectionsData.filter(
    (inspection) =>
      inspection.inspection_type === "completed" ||
      inspection.inspection_type === "approved" ||
      inspection.inspection_type === "unapproved"
  );

  return (
    <TableContainer sx={{ borderRadius: 3, height: "700px" }}>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        aria-label="Table of inspection history"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ flexGrow: 1 }}>
              <Typography fontSize={"12px"} fontWeight={700}>
                Location{" "}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ flexGrow: 1 }}>
              <Typography fontWeight={700} fontSize={"12px"}>
                Date and Time
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ flexGrow: 1 }}>
              <Typography fontWeight={700} fontSize={"12px"}>
                Status
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyInspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell sx={{ flexGrow: 1 }}>
                <Typography variant="body" fontWeight={700}>
                  {fullAddress(
                    inspection.propertyData.property_street_number,
                    inspection.propertyData.property_street_name,
                    inspection.propertyData.property_suburb,
                    inspection.propertyData.property_state
                  )}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="start">
                  <Image
                    sx={{
                      height: "150px",
                      width: "264px",
                      borderRadius: 3,
                    }}
                    src={inspection.propertyData.property_pictures?.[0]}
                    alt="Property"
                  />
                </Stack>
              </TableCell>

              <TableCell align="right" sx={{ flexGrow: 1 }}>
                {inspection.inspectionRunData.inspection_run_date} <br /> at{" "}
                {inspection.inspection_start}
              </TableCell>
              <TableCell align="right" sx={{ flexGrow: 1 }}>
                {inspection.inspection_type}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
