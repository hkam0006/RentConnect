import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import NavigationMenu from "../navigation_menu/NavigationMenus";

const Inspection = () => {
  const [activeSection, setActiveSection] = useState("inspection");

  return (
    <div>
      <NavigationMenu>
        <Grid
          container
          spacing={2}
          style={{ padding: "30px", paddingTop: "110px" }}
          justifyContent="flex-start"
        >
          <Button
            variant={activeSection === "inspection" ? "contained" : "outlined"}
            onClick={() => setActiveSection("inspection")}
            style={{ margin: "10px", fontSize: "150%" }}
          >
            Inspection
          </Button>

          <Button
            variant={activeSection === "history" ? "contained" : "outlined"}
            onClick={() => setActiveSection("history")}
            style={{ margin: "10px", fontSize: "150%" }}
          >
            History
          </Button>
        </Grid>
        <div style={{ padding: "20px" }}>
          {activeSection === "inspection" && (
            <Typography variant="h4">Inspection Content</Typography>
          )}
          {activeSection === "history" && (
            <Typography variant="h4">History Content</Typography>
          )}
        </div>
      </NavigationMenu>
    </div>
  );
};

export default Inspection;
