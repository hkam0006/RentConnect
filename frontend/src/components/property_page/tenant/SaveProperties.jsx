import React, { useEffect, useState } from 'react'
import { supabase } from "../../../supabase";
import { Typography, Grid} from "@mui/material";
import NavigationMenu from '../../navigation_menu/NavigationMenus';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    tableCellClasses,
  } from "@mui/material";
import { styled } from "@mui/material/styles";

const SavedProperties = () => {
    const [activeSection, setActiveSection] = useState("savedProperties");
    const [savedPropertiesData, setSavedPropertiesData] = useState([]);
    useEffect(() => {
        const fetchSavedPropertyData = async () => {
            try{
            const { data: properties, error: propertiesError } = await supabase
              .from("PROPERTY")
              .select("*");
    
            if (propertiesError) {
              throw propertiesError;
            }
            const { data: savedProperties, error: savedPropertiesError } = await supabase
              .from("SAVED PROPERTIES")
              .select("*");
    
            if (savedPropertiesError) {
              throw savedPropertiesError;
            }
    
            const mergedSavedProperty = savedProperties.map((savedProperty)=>{
                const property = properties.find((property) => property.property_id === savedProperty.property_id);
                return{
                    ...savedProperty,
                    propertyData: property || {}
                };
            });
            setSavedPropertiesData(mergedSavedProperty);
            console.log(mergedSavedProperty)
          } catch (error) {
            console.error("Error fetching saved property data:", error);
          }
        };
        fetchSavedPropertyData();
    }, []);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "white",
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 12,
        },
      }));
    return (
        <div>
          <NavigationMenu>
            <Grid
              container
              spacing={2}
              style={{ padding: "30px", paddingTop: "110px" }}
              justifyContent="flex-start"
            />
            <div style={{ padding: "20px" }}>
              {activeSection === "savedProperties" && (
                <Typography variant="h5">Saved Properties</Typography>
              )}
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="Table of saved properties">
                <TableHead>
                    <TableRow>
                    <StyledTableCell>
                  <Typography fontSize={"12px"} fontWeight={700}>
                    Property 
                  </Typography>
                </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {savedPropertiesData.map((savedProperty) => (
                        <TableRow
                        key = {savedProperty.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell>
                            <Typography variant="body" fontWeight={700}>
                            {savedProperty.propertyData.property_street_number}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    )
                )}
                </TableBody>
              </Table>
            </div>
          </NavigationMenu>
        </div>
      );
}
export default SavedProperties;