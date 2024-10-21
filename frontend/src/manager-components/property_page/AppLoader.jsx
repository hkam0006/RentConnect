import { CircularProgress, Stack } from "@mui/material";
import React from 'react'

export default function AppLoader() {
  return (
    <Stack mt={5} alignItems="center">
      <CircularProgress />
    </Stack>
  )
}
