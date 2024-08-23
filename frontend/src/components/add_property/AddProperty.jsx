import React, { useEffect, useState } from "react";
import NavigationMenu from "../navigation_menu/NavigationMenus";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AppLoader from "../property_page/AppLoader";
import useGetPropetyManagersByCompanyID from "../../queries/Property Manager/useGetPropetyManagersByCompanyID";
import ListingImage from '../property_page/listing.jpg'
import useAddProperty from "../../mutators/Property/useAddProperty";
import { v4 as uuidv4 } from 'uuid';

const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78";

const AddProp = () => {
  const propManagers = useGetPropetyManagersByCompanyID(TEST_COMPANY_ID);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const { addProperty } = useAddProperty();


  const [newProp, setNewProp] = useState({
    streetNumber: "",
    unitNumber: 0,
    streetName: "",
    streetType: "",
    suburb: "",
    state: "",
    postcode: "",
    vacancy: "",
    attendees: 0,
    applications: 0,
    listingImages: [ListingImage],
    propertyType: "",
    rent: "",
    payFreq: "",
    leaseStartDate: "",
    propManager: "",
    bedrooms: "",
    bathrooms: "",
    carSpaces: "",
    footprint: "",
    description: "",
    amenities: "",
    status: "Active",
    isAppliedFor: false
    })

    useEffect(() => {
      setLoading(false);
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
  // List of fields that should be converted to integers
  const intFields = [
    'streetNumber',
    'unitNumber',
    'bedrooms',
    'bathrooms',
    'carSpaces',
    'rent',
    'footprint',
    'attendees',
  ];

  setNewProp((prevState) => ({
    ...prevState,
    [name]: intFields.includes(name) ? parseInt(value, 10) || '' : value, // Convert to int if the field is in intFields
  }));
};

async function confirmPressed(event) {
  event.preventDefault();
  console.log(newProp)
  await addProperty(
    '1b9500a6-ac39-4c6a-971f-766f85b41d78',       // Hardcoded Company ID
    uuidv4(),                                     // UUID for Property ID
    newProp.streetNumber,
    newProp.streetName,
    newProp.streetType,
    newProp.suburb,
    newProp.state,
    newProp.bedrooms, newProp.bathrooms, newProp.carSpaces,
    newProp.propertyType, 
    newProp.rent, 
    newProp.footprint, 
    newProp.description, 
    newProp.amenities, 
    newProp.listingImages, 
    newProp.payFreq, 
    'fc8e3cf4-cbbc-4557-b303-7aa028c616eb',       // Hardcoded Property Manager ID
    null, 
    new Date(),
    0, 
    new Date(newProp.leaseStartDate), 
    newProp.unitNumber, 
    newProp.postcode)
}

const handlePhotosChange = (event) => {
  const files = Array.from(event.target.files);
  setPhotos(files);
};


  if (loading) return <AppLoader />;

  return (
    <NavigationMenu>
    <Box sx={{ mt: "70px", padding: "20px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom>
        Add Property Listing
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root, & .MuiFormControl-root': { m: 1, width: '100%' },
          maxWidth: '600px',
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>
        <Box sx={{ display: 'flex', width: '100%', gap: 0 }}>
        <FormControl fullWidth>
            <InputLabel id="property-manager-select-label">Property Manager</InputLabel>
            <Select
                required
                label="Property Manager"
                id="property-manager-select"
                value={newProp.propManager}
                onChange={handleChange}
                name='propManager'
                sx={{ flexBasis: '50%' }}
            >
            <MenuItem>None</MenuItem>
            {propManagers.map((manager) => (
              <MenuItem key={manager.property_manager_id} value={manager.property_manager_id}>
                {`${manager.property_manager_first_name} ${manager.property_manager_last_name}`}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
              <InputLabel id="property-type-select-label">Property Type</InputLabel>
              <Select
                  required
                  label="Property Type"
                  id="property-type-select"
                  value={newProp.propertyType}
                  onChange={handleChange}
                  name='propertyType'
                  sx={{ flexBasis: '50%' }}
              >
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Studio">Studio</MenuItem>
              </Select>
          </FormControl>
        </Box>
        <TextField
            required
            label="Property Description"
            variant="outlined"
            value={newProp.description}
            name='description'
            multiline
            rows={5}
            sx = {{ flexBasis: '100%' }}
            onChange={handleChange}
          />
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        <Box sx={{ display: 'flex', gap: 0 }}>
          <TextField
            required
            label="Street Number"
            value={newProp.streetNumber}
            name='streetNumber'
            variant="outlined"
            sx={{ flexBasis: '15%' }}
            onChange={handleChange}
          />
          <TextField
            label="Unit Number"
            value={newProp.unitNumber}
            name='unitNumber'
            variant="outlined"
            sx={{ flexBasis: '15%' }}
            onChange={handleChange}
          />
          <TextField
            required
            label="Street Name"
            value={newProp.streetName}
            name='streetName'
            variant="outlined"
            sx={{ flexBasis: '45%' }}
            onChange={handleChange}
          />
          <TextField
            required
            label="Street Type"
            value={newProp.streetType}
            name='streetType'
            variant="outlined"
            sx={{ flexBasis: '30%' }}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 0 }}>
        <TextField
            required
            label="Suburb"
            value={newProp.suburb}
            name='suburb'
            variant="outlined"
            sx={{ flexBasis: '50%' }}
            onChange={handleChange}
          />
          <TextField
            required
            label="State"
            value={newProp.state}
            name='state'
            variant="outlined"
            sx={{ flexBasis: '30%' }}
            onChange={handleChange}
          />
          <TextField
            required
            label="Postcode"
            value={newProp.postcode}
            name='postcode'
            variant="outlined"
            sx={{ flexBasis: '20%' }}
            onChange={handleChange}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          Facilities
        </Typography>
        <Stack direction='row' spacing={1}>
          <FormControl fullWidth >
              <InputLabel htmlFor="bedroom-select">Bedroom(s)</InputLabel>
              <Select
                  label="Bedroom(s)"
                  value={newProp.bedrooms}
                  onChange={handleChange}
                  name='bedrooms'
              >
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6+">6+</MenuItem>
              </Select>
          </FormControl>
          <FormControl fullWidth>
              <InputLabel htmlFor="bathroom-select">Bathroom(s)</InputLabel>
              <Select
                  label="Bathroom(s)"
                  value={newProp.bathrooms}
                  onChange={handleChange}
                  name='bathrooms'
              >
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6+">6+</MenuItem>
              </Select>
          </FormControl>
          <FormControl fullWidth>
              <InputLabel htmlFor="car-spaces-select">Car Spaces</InputLabel>
              <Select
                  label="Car Spaces"
                  value={newProp.carSpaces}
                  onChange={handleChange}
                  name='carSpaces'
              >
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6+">6+</MenuItem>
              </Select>
          </FormControl>
        </Stack>
        <Box sx={{ display: 'flex', width: '100%', gap: 0 }}>
          <TextField
            required
            label="Footprint (m²)"
            value={newProp.footprint}
            name='footprint'
            variant="outlined"
            sx={{ flexBasis: '50%' }}
            onChange={handleChange}
          />
          <TextField
            required
            label="Amenities"
            value={newProp.amenities}
            name='amenities'
            variant="outlined"
            multiline
            rows={2}
            sx={{ flexBasis: '50%' }}
            onChange={handleChange}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          Payment
        </Typography>
        <Box sx={{ display: 'flex', width: '100%', gap: 0 }}>
          <TextField
            required
            label="Rent Price"
            value={newProp.rent}
            name='rent'
            variant="outlined"
            onChange={handleChange}
          />
          <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Payment Frequency</InputLabel>
              <Select
                  label="Payment Frequency"
                  value={newProp.payFreq}
                  name='payFreq'
                  onChange={handleChange}
                  sx={{ flexBasis: '50%' }}
              >
                  <MenuItem value={null}>Not Selected</MenuItem>
                  <MenuItem value="Per Week">Per Week</MenuItem>
                  <MenuItem value="Per Fortnight">Per Fortnight</MenuItem>
                  <MenuItem value="Per Month">Per Month</MenuItem>
              </Select>
          </FormControl>
        </Box>
        <TextField
            label="Lease Start (YYYY-MM-DD)"
            required
            placeholder='YYYY-MM-DD'
            value={newProp.leaseStartDate}
            name='leaseStartDate'
            onChange={handleChange}
        />
        <Box>
          {/* THIS IS NOT WORKING AS OF YET */}
            <Typography variant="h6" gutterBottom>    
              Upload Photos (NOT WORKING)
            </Typography>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handlePhotosChange}
              value={newProp.listingImage}
              style={{ display: 'block', margin: '10px 0' }}
            />
          </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" onClick={(e) => confirmPressed(e)}>
            Add Property
          </Button>
        </Stack>
      </Box>
    </Box>
  </NavigationMenu>
  );
};

export default AddProp;
