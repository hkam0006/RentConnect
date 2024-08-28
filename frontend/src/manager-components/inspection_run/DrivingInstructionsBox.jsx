import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DrivingInstructionsBox = ({ instructions }) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" gutterBottom>
          Driving Instructions
        </Typography>
      </AccordionSummary>
      <AccordionDetails
      sx={{
          maxHeight: '300px', // Set the height limit
          overflowY: 'auto', // Enable vertical scrolling
        }}>
        <div dangerouslySetInnerHTML={{ __html: instructions }} />
      </AccordionDetails>
    </Accordion>
  );
};

export default DrivingInstructionsBox;
