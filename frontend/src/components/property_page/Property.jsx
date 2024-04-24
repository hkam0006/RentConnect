import React from 'react'
import { Container } from "@mui/material"
import { PropertyStatCards } from './PropertyStatCards';
import { PropertiesTable } from './PropertiesTable';
import { PropertySearch } from './PropertySearch';

export default function Property() {
  return (
    <Container sx={{ mt: 5, height: "80vh" }} >
      <PropertyStatCards />
      <PropertySearch />
      <PropertiesTable />
    </Container >
  )
}
