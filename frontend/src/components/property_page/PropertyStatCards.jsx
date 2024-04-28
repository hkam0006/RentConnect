import React, { useState } from 'react'
import { Typography, Container, Grid, Stack, Card, CardContent, MenuItem, Select, FormControl } from "@mui/material"


export function PropertyStatCards({ totalApplications, avgDOM, totalLeased }) {
  const [leasedTimeframe, setLeasedTimeframe] = useState("All Time");
  const [totalApplicationsTimeFrame, setTotalApplicationsTimeFrame] = useState("All Time");

  const handleLeaseChange = (event) => {
    setLeasedTimeframe(event.target.value);
  };

  const handleApplicationChange = (event) => {
    setTotalApplicationsTimeFrame(event.target.value);
  };


  return <>
    {/* Total Property Leased Card */}
    <Grid container spacing={2} >
      <Grid xs={12} sm={4} item>
        <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant='caption' fontWeight={700} color="text.secondary">Total Properties Leased</Typography>
              <FormControl size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={leasedTimeframe}
                  onChange={handleLeaseChange}
                  variant='standard'
                >
                  <MenuItem value={"All Time"}>All Time</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                  <MenuItem value={"Yearly"}>Yearly</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack textAlign={"center"}>
              <Typography variant='h3' fontWeight={700} color={"primary"}>{totalLeased}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Applications Received */}
      <Grid xs={12} sm={4} item>
        <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant='caption' fontWeight={700} color="text.secondary">Total Applications Received</Typography>
              <FormControl size="small">
                <Select
                  labelId="total-appliication-received"
                  id="total-appliication-received"
                  value={totalApplicationsTimeFrame}
                  onChange={handleApplicationChange}
                  sx={{
                    height: "100%"
                  }}
                  variant='standard'
                >
                  <MenuItem value={"All Time"}>All Time</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                  <MenuItem value={"Yearly"}>Yearly</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack textAlign={"center"}>
              <Typography variant='h3' fontWeight={700} color={"primary"}>{totalApplications}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Average Days on Market */}
      <Grid xs={12} sm={4} item>
        <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant='caption' fontWeight={700} color="text.secondary">Average DoM</Typography>
              <FormControl size="small">

              </FormControl>
            </Stack>
            <Stack textAlign={"center"}>
              <Typography variant='h3' fontWeight={700} color={"primary"}>{avgDOM}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
}
