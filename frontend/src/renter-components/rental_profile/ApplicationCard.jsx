import useGetOnlyPropertyByPropertyID from '../../queries/Property/useGetOnlyPropertyByPropertyID'
import { Box, Typography, Button, Card, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function ApplicationCard({ application }) {
    const navigate = useNavigate()
    const property = useGetOnlyPropertyByPropertyID(application.property_id)?.[0] || null

    const applicationStatusColour = (status) => {
        switch (status) {
            case 'approved':
                return 'green'
            case 'progress':
                return 'grey'
            case 'rejected':
                return 'red'
            default:
                return 'grey'
        }
    }

    const applicationStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Approved'
            case 'progress':
                return 'Processing'
            case 'rejected':
                return 'Rejected'
            default:
                return status
        }
    }

    return (
        <Box>
            {property && (
                <Card sx={{ display: 'flex', marginBottom: 2 }}>
                    <CardMedia
                        component='img'
                        sx={{ width: 300, height: 250, objectFit: 'cover' }}
                        image={property.property_pictures[0]}
                        alt="Property Image"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', flexGrow: 1, padding: 2 }}>
                        <Typography variant="h7" gutterBottom>
                            {property.property_street_number} {property.property_street_name} {property.property_street_type}, {property.property_suburb}, {property.property_postcode}
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            {property.property_type} - ${property.property_rent} {property.property_rent_frequency}
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            {property.property_bedroom_count} BED {property.property_bathroom_count} BATH {property.property_car_spot_count} CAR
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            APPLICATION STATUS
                        </Typography>
                        <Box sx={{width: 100, height: 40, borderRadius: 2, color: 'white', backgroundColor: applicationStatusColour(application.application_status), display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            {applicationStatusText(application.application_status)}
                        </Box>
                        <Button variant='contained' sx={{ marginTop: 2 }} onClick={() => navigate(`/messages/${property.property_manager_id}`)}>
                            <Typography>
                                MESSAGE MANAGER
                            </Typography>
                        </Button>
                    </Box>
                </Card>
            )}
        </Box>
    )
}

export default ApplicationCard