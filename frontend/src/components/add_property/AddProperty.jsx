import React, { useEffect, useState } from "react";
import NavigationMenu from "../navigation_menu/NavigationMenus";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  Stack,
  Button,
  Chip,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AppLoader from "../property_page/AppLoader";
import useGetPropetyManagersByCompanyID from "../../queries/Property Manager/useGetPropetyManagersByCompanyID";
import ListingImage from '../property_page/listing.jpg'

const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78";

const AddProp = () => {
  const propManagers = useGetPropetyManagersByCompanyID(TEST_COMPANY_ID);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [newRow, setNewRow] = useState({
    address: "",
    vacancy: 0,
    attendees: 0,
    applications: 0,
    listingImage: ListingImage,
    type: "",
    price: 0,
    payFreq: "",
    available: "",
    propManager: "",
    bedrooms: "0",
    bathrooms: "0",
    car_spaces: "0",
    status: "Active"
    })

    useEffect(() => {
      setLoading(false);
    }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewRow(prevState => ({
        ...prevState,
        [name]: value
    }))
}

const handlePhotosChange = (event) => {
  const files = Array.from(event.target.files);
  setPhotos(files);
};


  if (loading) return <AppLoader />;

  return (
    <NavigationMenu>
    <Box sx={{ mt: "70px", padding: "20px", width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Add Property Listing
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          maxWidth: '600px',
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth gutterBottom>
          <InputLabel id="property-manager-select-label">Property Manager</InputLabel>
          <Select
              required
              label="Property Manager"
              id="property-manager-select"
              value={newRow.propManager}
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
                value={newRow.type}
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
                                value={newRow.bedrooms}
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
                                value={newRow.bathrooms}
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
                                value={newRow.car_spaces}
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
            value={newRow.available}
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
                value={newRow.payFreq}
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
          <Button variant="contained" color="primary" type="submit">
            Add Property
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  </NavigationMenu>
  );
};

export default AddProp;
