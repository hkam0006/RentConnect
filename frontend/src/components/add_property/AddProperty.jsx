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
import useApp from '../../hooks/useApp'

const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78";

const AddProp = () => {
  const propManagers = useGetPropetyManagersByCompanyID(TEST_COMPANY_ID);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const { createProperty } = useApp();

  const [newProp, setNewProp] = useState({
    streetNumber: 0,
    unitNumber: "",
    streetName: "",
    streetType: "",
    suburb: "",
    state: "",
    vacancy: 0,
    attendees: 0,
    applications: 0,
    listingImage: ListingImage,
    propertyType: "",
    rent: 0,
    payFreq: "",
    leaseStartDate: "",
    propManager: "",
    bedrooms: 0,
    bathrooms: 0,
    carSpaces: 0,
    footprint: 0,
    description: "",
    amenities: "",
    status: "Active",
    isAppliedFor: false
    })

    useEffect(() => {
      setLoading(false);
    }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewProp(prevState => ({
        ...prevState,
        [name]: value
    }))
}

async function confirmPressed(event) {
  event.preventDefault();
  console.log(newProp)
  await createProperty("testID", newProp)
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
        <FormControl fullWidth gutterBottom>
          <InputLabel id="property-manager-select-label">Property Manager</InputLabel>
          <Select
              required
              label="Property Manager"
              id="property-manager-select"
              value={newProp.propManager}
              onChange={handleChange}
              name='propManager'
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
                value={newProp.type}
                onChange={handleChange}
                name='type'
            >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Studio">Studio</MenuItem>
            </Select>
        </FormControl>
        <TextField
          required
          label="Address"
          variant="outlined"
        />
        <TextField
          required
          label="Suburb"
          variant="outlined"
        />
        <TextField
          required
          label="State"
          variant="outlined"
        />
        <TextField
          required
          label="Postcode"
          variant="outlined"
        />
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
                                value={newProp.car_spaces}
                                onChange={handleChange}
                                name='car_spaces'
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
        <Typography variant="h6" gutterBottom>
          Payment
        </Typography>
        <TextField
            label="Lease Start"
            required
            placeholder='DD/MM/YYYY'
            name='available'
            value={newProp.available}
            onChange={handleChange}
        />
        <TextField
          required
          label="Amount"
          variant="outlined"
        />
        <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Payment Frequency</InputLabel>
            <Select
                label="Payment Frequency"
                value={newProp.payFreq}
                onChange={handleChange}
                name='payFreq'
            >
                <MenuItem value={null}>Not Selected</MenuItem>
                <MenuItem value="Per Week">Per Week</MenuItem>
                <MenuItem value="Per Fortnight">Per Fortnight</MenuItem>
                <MenuItem value="Per Month">Per Month</MenuItem>
            </Select>
        </FormControl>
        <Box>
            <Typography variant="h6" gutterBottom>
              Upload Photos
            </Typography>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handlePhotosChange}
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
