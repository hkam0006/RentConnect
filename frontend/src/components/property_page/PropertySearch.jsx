import React, { useState } from 'react'
import { Grid, TextField, FormControl, Select, InputLabel, MenuItem, OutlinedInput, Typography } from "@mui/material"


export function PropertySearch({ filterProperties, unfilteredProperties, propManagers }) {

  const [propManager, setPropManager] = useState('');
  const [status, setStatus] = useState([]);
  const [query, setQuery] = useState("");

  function handleManagerFilterChange(e) {
    const selectedPropManager = e.target.value;
    setPropManager(selectedPropManager);
    if (selectedPropManager.length === 0) {
      return filterProperties(filterBySearch(unfilteredProperties, query));
    }
    let arrayCopy = filterByManager(unfilteredProperties, selectedPropManager)
    if (query.length > 0) {
      arrayCopy = arrayCopy.filter((property) => property.address.toLowerCase().includes(query.toLowerCase()))
    }
    filterProperties(arrayCopy);
  }

  function handleApplicationStatus(e) {
    const { value } = e.target;
    setStatus(
      typeof value === 'string' ? value.split(",") : value
    );
  }

  function handleSearchChange(event) {
    const searchQuery = event.target.value;
    console.log(propManager)
    setQuery(searchQuery)
    if (searchQuery.length === 0) {
      return filterProperties(filterByManager(unfilteredProperties, propManager));
    }
    let arrayCopy = unfilteredProperties.filter((property) => property.address.toLowerCase().includes(searchQuery.toLowerCase()));
    if (propManager.length > 0) {
      arrayCopy = arrayCopy.filter((property) => property.propManager === propManager);
    }
    filterProperties(arrayCopy)
  }

  function filterBySearch(arr, query) {
    if (query.length === 0) {
      return arr;
    }
    const arrayCopy = arr.filter((property) => property.address.toLowerCase().includes(query.toLowerCase()))
    return arrayCopy;
  }

  function filterByManager(arr, propManager) {
    if (propManager.length === 0) {
      setPropManager('')
      return arr;
    }
    const arrayCopy = arr.filter((property) => property.propManager === propManager);
    return arrayCopy;
  }

  return (
    <Grid container spacing={2} sx={{ mt: "2px" }}>
      <Grid xs={12} sm={4} item >
        <TextField name='query' value={query} onChange={handleSearchChange} fullWidth size="small" placeholder='Search Property Address' variant='standard'></TextField>
      </Grid>
      <Grid xs={12} sm={4} item >
        <FormControl fullWidth size='small'>
          <Select
            variant='standard'
            id="property-manager-select"
            name='propManager'
            displayEmpty
            value={propManager}
            onChange={handleManagerFilterChange}
          >
            <MenuItem value=""><Typography color='gray'><em>Filter Property Manager</em></Typography></MenuItem>
            {propManagers.map((manager, index) => (
              <MenuItem key={index} value={manager}>{manager}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12} sm={4} item >
        <FormControl fullWidth size='small'>
          <Select
            variant='standard'
            id="property-status-select"
            value={status}
            onChange={handleApplicationStatus}
            multiple
            displayEmpty
            name="application-status"
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <Typography color='gray'><em>Filter Application Status</em></Typography>;
              }
              return selected.join(', ');
            }}
          >
            <MenuItem disabled value=""><Typography color='gray'><em>Filter Application Status</em></Typography></MenuItem>
            <MenuItem value="Active with Contract">Active with Contract</MenuItem>
            <MenuItem value="Back on Market">Back on Market</MenuItem>
            <MenuItem value="Temporarily off Market">Temporarily off Market</MenuItem>
            <MenuItem value="Deal Pending">Deal Pending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
