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

const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78";         // Hardcoded, is to be the super admin's company

const AddProp = () => {
  const propManagers = useGetPropetyManagersByCompanyID(TEST_COMPANY_ID);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
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
    listingImages: [],
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

    // Clear the error for this field
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  
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
      })
    );
  };

  const handleClear = () => {
    setNewProp({
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
      listingImages: [],
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
    });
    
    setPhotos([]);
    setErrors({});  // Clear all errors as well
  };

  async function confirmPressed(event) {
    event.preventDefault();
    console.log(newProp)

    const isValid = validateForm();
    if (!isValid) {
      return;  // Stop submission if the form is not valid
    }

    await addProperty(
      TEST_COMPANY_ID,                              // Hardcoded Company ID
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
      newProp.postcode
    )
  }

  const handlePhotosChange = (event) => {
    const newFiles = Array.from(event.target.files);

    //Append new files
    setPhotos(prevPhotos => [...prevPhotos, ...newFiles]);
    setNewProp((prevState) => ({
      ...prevState,
      listingImages: [...prevState.listingImages, ...newFiles]
    }));
  };

  // Function for handling deleting a photo
  const handleDeletePhoto = (photo, index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));

    // Also remove the photo from the `newProp.listingImages` array
    setNewProp((prevState) => ({
      ...prevState,
      listingImages: prevState.listingImages.filter((_, i) => i !== index),
    }));
  }
  

  const formErrors = {
    'streetNumber': 'The street number',
    'streetName': 'The street name',
    'streetType': 'The street type',
    'suburb': 'A suburb',
    'state': 'A state',
    'postcode': 'A postcode',
    'description': ' A description of the property',
    'footprint': 'The property footprint',
    'rent': 'The rent price',
    'leaseStartDate': 'The lease start date',
    'propertyType': 'The property type',
    'propManager': 'A property manager',
    'payFreq': 'The payment frequency',
    'bedrooms': 'The number of bedrooms',
    'bathrooms': 'The number of bathrooms',
    'carSpaces': 'The number of car spaces',
  }

  const validateForm = () => {
    const newErrors = {};
  
    // Check if required fields are filled
    const requiredFields = [
      'streetNumber',
      'streetName',
      'streetType',
      'suburb',
      'state',
      'postcode',
      'description',
      'footprint',
      'rent',
      'leaseStartDate',
      'propertyType',
      'propManager',
      'payFreq'
    ];
  
    requiredFields.forEach((field) => {
      if (!newProp[field]) {
        newErrors[field] = `${formErrors[field]} is required`;
      }
    });
  
    // Check if integer fields contain valid numbers
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
  
    intFields.forEach((field) => {
      if (isNaN(newProp[field]) || newProp[field] === '') {
        newErrors[field] = `${formErrors[field]} must be a valid number`;
      }
    });
  
    // Set errors state
    setErrors(newErrors);
  
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  

  if (loading) return(
    <NavigationMenu>
      <AppLoader />
    </NavigationMenu>
  );

  return (
    <NavigationMenu>
    <Box sx={{ mt: "70px", padding: "30px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
    <Box
      sx={{
        padding: "20px",
        width: "100%",
        maxWidth: "700px",
        backgroundColor: "white",  // Makes the tile white to pop from background
        borderRadius: "10px",      // Rounded corners for the "file" effect
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
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
        <FormControl fullWidth error={!!errors.propManager}>
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
            {errors.propManager && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-j8xf70-MuiFormHelperText-root">{errors.propManager}</p>}
          </FormControl>
          <FormControl fullWidth error={!!errors.propertyType}>
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
              {errors.propertyType && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-j8xf70-MuiFormHelperText-root">{errors.propertyType}</p>}
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
            error={!!errors.description}  // Show error styling if there's an error
            helperText={errors.description}  // Display the error message
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
            error={!!errors.streetNumber}  // Show error styling if there's an error
            helperText={errors.streetNumber}  // Display the error message
          />
          <TextField
            label="Unit Number"
            value={newProp.unitNumber}
            name='unitNumber'
            variant="outlined"
            sx={{ flexBasis: '15%' }}
            onChange={handleChange}
            error={!!errors.unitNumber}  // Show error styling if there's an error
            helperText={errors.unitNumber}  // Display the error message
          />
          <TextField
            required
            label="Street Name"
            value={newProp.streetName}
            name='streetName'
            variant="outlined"
            sx={{ flexBasis: '45%' }}
            onChange={handleChange}
            error={!!errors.streetName}  // Show error styling if there's an error
            helperText={errors.streetName}  // Display the error message
          />
          <TextField
            required
            label="Street Type"
            value={newProp.streetType}
            name='streetType'
            variant="outlined"
            sx={{ flexBasis: '30%' }}
            onChange={handleChange}
            error={!!errors.streetType}  // Show error styling if there's an error
            helperText={errors.streetType}  // Display the error message
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
            error={!!errors.suburb}  // Show error styling if there's an error
            helperText={errors.suburb}  // Display the error message
          />
          <TextField
            required
            label="State"
            value={newProp.state}
            name='state'
            variant="outlined"
            sx={{ flexBasis: '30%' }}
            onChange={handleChange}
            error={!!errors.state}  // Show error styling if there's an error
            helperText={errors.state}  // Display the error message
          />
          <TextField
            required
            label="Postcode"
            value={newProp.postcode}
            name='postcode'
            variant="outlined"
            sx={{ flexBasis: '20%' }}
            onChange={handleChange}
            error={!!errors.postcode}  // Show error styling if there's an error
            helperText={errors.postcode}  // Display the error message
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          Facilities
        </Typography>
        <Stack direction='row' spacing={1}>
          <FormControl fullWidth error={!!errors.bedrooms}>
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
              {errors.bedrooms && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-j8xf70-MuiFormHelperText-root">{errors.bedrooms}</p>}
          </FormControl>
          <FormControl fullWidth error={!!errors.bathrooms}>
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
              {errors.bathrooms && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-j8xf70-MuiFormHelperText-root">{errors.bathrooms}</p>}
          </FormControl>
          <FormControl fullWidth error={!!errors.carSpaces}>
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
              {errors.carSpaces && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-j8xf70-MuiFormHelperText-root">{errors.carSpaces}</p>}
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
            error={!!errors.footprint}  // Show error styling if there's an error
            helperText={errors.footprint}  // Display the error message
          />
          <TextField
            label="Amenities"
            value={newProp.amenities}
            name='amenities'
            variant="outlined"
            multiline
            rows={2}
            sx={{ flexBasis: '50%' }}
            onChange={handleChange}
            error={!!errors.amenities}  // Show error styling if there's an error
            helperText={errors.amenities}  // Display the error message
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
            error={!!errors.rent}  // Show error styling if there's an error
            helperText={errors.rent}  // Display the error message
          />
          <FormControl fullWidth error={!!errors.payFreq}>
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
              {errors.payFreq && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained Mui-required css-j8xf70-MuiFormHelperText-root">{errors.payFreq}</p>}
          </FormControl>
        </Box>
        <TextField
            label="Lease Start (YYYY-MM-DD)"
            required
            placeholder='YYYY-MM-DD'
            value={newProp.leaseStartDate}
            name='leaseStartDate'
            onChange={handleChange}
            error={!!errors.leaseStartDate}  // Show error styling if there's an error
            helperText={errors.leaseStartDate}  // Display the error message
        />
        <Box>
            <Typography variant="h6" gutterBottom>    
              Upload Photos
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ 
                display: 'block', 
                margin: '10px 0',
                width: {
                  xs: '50%',
                  sm: '30%',
                  md: '30%',
                  lg: '20%',
                },
                textAlign: 'center',
              }}
            >
              Add Photos
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handlePhotosChange}
                hidden
              />
            </Button>
            {photos.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              {photos.map((photo, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '100px',
                    height: '100px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    '&:hover .delete-btn': { display: 'block' } // Show delete button on hover
                  }}
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`uploaded-${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Button
                    className="delete-btn"
                    sx={{
                      display: 'none', // Hidden by default
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      backgroundColor: 'rgba(255, 0, 0, 0.8)',
                      color: '#fff',
                      borderRadius: '50%',
                      minWidth: '30px',
                      minHeight: '30px',
                      zIndex: 1,
                    }}
                    onClick={() => handleDeletePhoto(photo, index)}
                  >
                    X
                  </Button>
                </Box>
              ))}
            </Box>
          )}
          </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 12 }}>
          <Button variant="contained" color="primary" type="submit" onClick={(e) => confirmPressed(e)}>
            Add Property
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear
          </Button>
        </Stack>
      </Box>
      </Box>
    </Box>
  </NavigationMenu>
  );
};

export default AddProp;
