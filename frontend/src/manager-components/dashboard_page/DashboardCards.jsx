import React, { useEffect, useState } from 'react'
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
    CardMedia,
    createTheme, ThemeProvider, IconButton, Avatar
} from "@mui/material"
import CardHeader from '@mui/material/CardHeader';
import { BarChart } from '@mui/x-charts/BarChart';
import defaultImageUrl from './house_default.jpg'
import useGetPropertyManagerByPropertyManagerID from '../../queries/Property Manager/useGetPropertyManagerByPropertyManagerID';
import useGetCompanyByCompanyID from '../../queries/Company/useGetCompanyByCompanyID';
import useGetPropertiesByCompanyID from '../../queries/Property/useGetPropertiesByCompanyID';
import { supabase } from '../../supabase';
import useGetUserID from '../../queries/useGetUserID';


export default function ChartsOverviewDemo() {
    return (
        <BarChart
            series={[
                { data: [8000, 4500, 1325, 4867, 2576, 3587, 6758, 8000, 4576, 7685, 5635, 3285] }
            ]}
            height={200}
            xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    );
}

export function DashboardCards() {
    const [company, setCompany] = useState({});
    const [properties, setProperties] = useState({});
    const {userID, loading: userLoading} = useGetUserID();
    const fetchCompany = useGetCompanyByCompanyID();
    const fetchProperies = useGetPropertiesByCompanyID();
    const{propertyManager, loading: propertyManagerLoading} = useGetPropertyManagerByPropertyManagerID(userID);
    
    useEffect(() => {
        async function getCompanyData() {
            const companyTemp = await fetchCompany(propertyManager.company_id);
            setCompany(companyTemp.data[0]);
            const propertiesTemp = await fetchProperies(propertyManager.company_id);
            setProperties(propertiesTemp.data[0]);
        }
        if (!propertyManagerLoading && !userLoading){
            getCompanyData();
        }
    }, []);

    return <>
        <Grid container spacing={2} >
            {/* Income Statistic Graph Card */}
            <Grid xs={12} sm={5} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#feede2"}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant='h6' fontWeight={700} color="text.primary">Income Statistic</Typography>
                        </Stack>
                        <Stack textAlign={"center"}>
                            <ChartsOverviewDemo />
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Annual Income Card */}
            <Grid xs={12} sm={1.5} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#89caff"}}>
                    <CardContent>
                        <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={17}>
                            <Typography variant='body1' fontWeight={700} color="text.primary">Annual Income</Typography>
                            <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={0}>
                                <Typography variant='h5' fontWeight={700} color={"text.primary"}>{"$3.5K"}</Typography>
                                <Typography variant='caption' fontWeight={700} color={"text.secondary"}>{"↑19.5%"}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Total Properties Card */}
            <Grid xs={12} sm={1.5} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#96f2d3"}}>
                    <CardContent>
                        <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={18}>
                            <Typography variant='body1' fontWeight={700} color="text.primary">Total Properties</Typography>
                            <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={0}>
                                <Typography variant='caption' fontWeight={900} color={"text.primary"}>{"3 Apartments"}</Typography>
                                <Typography variant='caption' fontWeight={1000} color={"text.primary"}>{"2 Houses"}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Overall Rating Card */}
            <Grid xs={12} sm={1.5} item>
                <Card sx={{ width: "100%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#ef99ba"}}>
                    <CardContent>
                        <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={18}>
                            <Typography variant='body1' fontWeight={700} color="text.primary">Overall Rating</Typography>
                            <Stack direction="column" alignItems="flex-start" justifyContent="space-between" spacing={0}>
                                <Typography variant='h6' fontWeight={900} color={"text.primary"}>{"4.5 Stars"}</Typography>
                                <Typography variant='caption' fontWeight={1000} color={"text.secondary"}>{"Great job!"}</Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            {/* Appointment Card */}
            <Grid xs={12} sm={2.5} item>
                <Card sx={{ width: "120%", height: "100%", borderRadius: 3 }} style={{backgroundColor: "#ffffff"}}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                            </IconButton>
                        }
                        title="Appointment"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="100"
                        image={defaultImageUrl}
                        alt="House Appointment"
                    />
                    <CardContent>
                        <Typography variant="h6" color="text.secondary">Event: Inspection</Typography>
                        <Typography variant="body1" color="text.secondary">Time: 8:00pm</Typography>
                    </CardContent>
                </Card>
            </Grid>


        </Grid>
    </>
}