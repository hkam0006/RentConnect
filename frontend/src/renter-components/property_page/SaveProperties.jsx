import React, { useEffect, useState } from 'react'
import { supabase } from "../../supabase";
import { Typography, Button } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ImgElement from '../../manager-components/property_page/ImgElement';

const fullAddress = (number, name, type, suburb, state) => {
  return `${number} ${name} ${type}, ${suburb}, ${state}`
}
// Function that allows saving of properties for tenants. Saved properties can be unsaved as well
const SavedProperties = () => {
  const [activeSection, setActiveSection] = useState("savedProperties");
  const [savedPropertiesData, setSavedPropertiesData] = useState([]);
  useEffect(() => {
    // find properties that have been saved 
    const fetchSavedPropertyData = async () => {
      try {
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
        console.log(savedProperties)
        const mergedSavedProperty = savedProperties.map((savedProperty) => {
          const property = properties.find((property) => property.property_id === savedProperty.property_id);
          return {
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

  //unsaving of properties
  const handleUnsave = async (id) => {
    try {
      const { error } = await supabase
        .from("SAVED PROPERTIES")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update the local state after successfully deleting from the database
      setSavedPropertiesData((prevData) =>
        prevData.filter((savedProperty) => savedProperty.id !== id)
      );
    } catch (error) {
      console.error("Error removing saved property:", error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const navigate = useNavigate();

  return (
    <div>
      <NavigationMenu>
        <div style={{ padding: "20px", marginTop: "64px" }}>
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
                <StyledTableCell align="right"><Typography fontWeight={700} fontSize={"12px"}></Typography></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedPropertiesData.map((savedProperty) => (
                <TableRow
                  key={savedProperty.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body" fontWeight={700}>
                      {fullAddress(
                        savedProperty.propertyData.property_street_number,
                        savedProperty.propertyData.property_street_name,
                        savedProperty.propertyData.property_street_type,
                        savedProperty.propertyData.property_suburb,
                        savedProperty.propertyData.property_state
                      )}
                    </Typography>
                    <Stack direction='row' spacing={2} justifyContent="start" >
                      <ImgElement sx={{ height: '150px', width: '264px', borderRadius: 3 }} src={savedProperty.propertyData.property_pictures[0]} alt='Stock Listing Image' />
                      <Stack>
                        <Stack direction='row' spacing={2}>
                          <Stack direction='row' spacing={0.5} alignItems={"center"}>
                            <BedIcon />
                            <Typography alignContent="center" fontWeight={700} variant='h6'>{savedProperty.propertyData.property_bedroom_count}</Typography>
                          </Stack>
                          <Stack direction='row' spacing={0.5} alignItems={"center"}>
                            <BathtubIcon />
                            <Typography alignContent="center" fontWeight={700} variant='h6'>{savedProperty.propertyData.property_bathroom_count}</Typography>
                          </Stack>
                          <Stack direction='row' spacing={0.5} alignItems={"center"}>
                            <DirectionsCarIcon />
                            <Typography alignContent="center" fontWeight={700} variant='h6'>{savedProperty.propertyData.property_car_spot_count}</Typography>
                          </Stack>
                        </Stack>
                        <Typography>${savedProperty.propertyData.property_rent} {savedProperty.propertyData.property_rent_frequency}</Typography>
                        <Typography>Type: {savedProperty.propertyData.property_type}</Typography>
                        <Typography>Available: {savedProperty.propertyData.property_lease_start}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                  <Stack spacing={1}>
                  <Button variant='contained' onClick={() => navigate(`/application/${savedProperty.propertyData.property_id}`)}>View</Button>
                  <Button variant='outlined' onClick={() => handleUnsave(savedProperty.id)} >Unsave</Button>
                </Stack>
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