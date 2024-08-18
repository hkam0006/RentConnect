import React from "react";
import { Modal, Typography, Box } from "@mui/material";

const DrivingInstructionsBox = ({ instructions }) => {
  return (
    <Box
      sx={{
        width: "35%",
        height: "400px",
        overflowY: "auto",
        padding: "10px",
        border: "2px solid #4CAF50",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Driving Instructions
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
    </Box>
  );
};

export default DrivingInstructionsBox;
