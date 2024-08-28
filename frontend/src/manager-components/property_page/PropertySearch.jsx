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
    if (value.length === 0) {
      filterProperties(unfilteredProperties);
      return
    }

    const arrCopy = unfilteredProperties.filter((property) => value.includes(property.status));
    filterProperties(arrCopy)
  }

  function handleSearchChange(event) {
    const searchQuery = event.target.value;
    setQuery(searchQuery)
    if (searchQuery.length === 0) {
      return filterProperties(filterByManager(unfilteredProperties, propManager));
    }
    let arrayCopy = filterBySearch(unfilteredProperties, searchQuery.toLowerCase())
    filterProperties(arrayCopy)
  }

  function filterBySearch(arr, query) {
    if (query.length === 0) {
      return arr;
    }
    const arrayCopy = arr.filter((property) => matchesQuery(property, query))
    return arrayCopy;
  }

  const matchesQuery = (p, query) => {
    console.log(p.property_state.toLowerCase().includes(query))
    return p.property_state.toLowerCase().includes(query) || p.property_street_type.toLowerCase().includes(query) || p.property_street_name.toLowerCase().includes(query) || p.property_street_number.toString().includes(query) || p.property_suburb.toLowerCase().includes(query);
  }

  function filterByManager(arr, propManager) {
    if (propManager.length === 0) {
      setPropManager('')
      return arr;
    }
    const arrayCopy = arr.filter((property) => property.property_manager_id === propManager);
    return arrayCopy;
  }

  return (
    <Grid container spacing={2} sx={{ mt: "2px" }} px={2}>
      <Grid xs={12} sm={4} item>
        <TextField name='query' value={query} onChange={handleSearchChange} fullWidth size="small" placeholder='Search Property Address' variant='outlined'></TextField>
      </Grid>
      <Grid xs={12} sm={4} item >
        <FormControl fullWidth size='small'>
          <Select
            variant='outlined'
            id="property-manager-select"
            name='propManager'
            displayEmpty
            value={propManager}
            onChange={handleManagerFilterChange}
          >
            <MenuItem value=""><Typography color='gray'><em>Filter Property Manager</em></Typography></MenuItem>
            {propManagers.map((man) => (
              <MenuItem key={man.property_manager_id} value={man.property_manager_id}>
                {`${man.property_manager_first_name} ${man.property_manager_last_name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12} sm={4} item >
        <FormControl fullWidth size='small'>
          <Select
            variant='outlined'
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
            <MenuItem value="Leased">Leased</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
