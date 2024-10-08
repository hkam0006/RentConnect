import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, Typography, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

/* Helps display the itinerary on the side of the map modal
Inputs: Itinerary (list of locations), legDurations (time for each location)
Output: list of locations and the journey time */
const DrivingInstructionsBox = ({ itinerary,  legDurations }) => {
  return (
    <Accordion defaultExpanded sx={{ width: "30%" }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography variant="h6" gutterBottom>
        Itinerary
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ maxHeight: "300px", overflowY: "auto" }}>
      <List>
        {itinerary.map((place, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Typography variant="body1">{place}</Typography>
            </ListItem>
            {index < itinerary.length - 1 && (
              <>
                <Divider
                  sx={{
                    borderStyle: "dotted",
                    margin: "8px 0",
                  }}
                />
                <ArrowDownwardIcon
                  sx={{
                    display: "block",
                    margin: "0 auto",
                    color: "grey",
                  }}
                />
                <Typography variant="caption" color="textSecondary">
                   Journey Duration: {legDurations[index]?.duration} mins
                  </Typography>
              </>
            )}
          </React.Fragment>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);
};

export default DrivingInstructionsBox;
