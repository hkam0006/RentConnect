import React, { useState } from 'react'
import {
    Typography,
    Container,
    Grid,
    Stack,
    Card,
    CardContent,
    MenuItem,
    Select,
    FormControl,
    CardMedia, createTheme, ThemeProvider
} from "@mui/material"

export function DashboardCards() {

    return <>
        <Grid container spacing={2} >
            {/* Income Statistic Graph Card */}
            <Grid xs={12} sm={4} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#feede2"}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant='h6' fontWeight={700} color="text.secondary">Income Statistic</Typography>
                        </Stack>
                        <Stack textAlign={"center"}>
                            <Typography variant='h3' fontWeight={700} color={"primary"}>{42}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Annual Income Card */}
            <Grid xs={12} sm={1.5} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#89caff"}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant='body1' fontWeight={700} color="text.secondary">Annual Income</Typography>
                        </Stack>
                        <Stack textAlign={"center"}>
                            <Typography variant='h3' fontWeight={700} color={"primary"}>{42}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Total Properties Card */}
            <Grid xs={12} sm={1.5} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#96f2d3"}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant='body1' fontWeight={700} color="text.secondary">Total Properties</Typography>
                        </Stack>
                        <Stack textAlign={"center"}>
                            <Typography variant='h3' fontWeight={700} color={"primary"}>{42}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Overall Rating Card */}
            <Grid xs={12} sm={1.5} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#ef99ba"}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant='body1' fontWeight={700} color="text.secondary">Overall Rating</Typography>
                        </Stack>
                        <Stack textAlign={"center"}>
                            <Typography variant='h3' fontWeight={700} color={"primary"}>{42}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Appointment Card */}
            <Grid xs={12} sm={3} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#f9fbfd"}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant='subtitle1' fontWeight={700} color="text.secondary">Appointment</Typography>
                        </Stack>
                        <Stack textAlign={"center"}>
                            <Typography variant='h3' fontWeight={700} color={"primary"}>{42}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>


        </Grid>
    </>
}