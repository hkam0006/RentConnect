import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DrivingInstructionsBox = ({ itinerary }) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" gutterBottom>
          Itinerary
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <List>
          {itinerary.map((place, index) => (
            <ListItem key={index}>
              <Typography variant="body1">{place}</Typography>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default DrivingInstructionsBox;
