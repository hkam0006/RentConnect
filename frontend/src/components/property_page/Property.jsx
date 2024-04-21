import React, { useState } from 'react'
import { Container } from "@mui/material"
import { PropertyStatCards } from './PropertyStatCards';
import { PropertiesTable } from './PropertiesTable';
import { PropertySearch } from './PropertySearch';

export default function Property() {
  return (
    <Container sx={{ mt: 10, height: "80vh" }} >
      <PropertyStatCards />
      <PropertySearch />
      <PropertiesTable />
    </Container >
  )
}
