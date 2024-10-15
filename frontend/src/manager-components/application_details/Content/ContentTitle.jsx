import { useParams } from 'react-router-dom'
import { Typography, Grid, Button, Box } from '@mui/material'
import { Chat, Check, Close } from '@mui/icons-material'
import useUpdateApplicationStatusByID from '../../../mutators/Application/useUpdateApplicationStatusByID'
import useGetApplicationSectionVerifiedByID from '../../../queries/Application/useGetApplicationSectionVerifiedByID'

const contentSection = {
    'Preferences': 'preferences_verified',
    'Address History': 'address_history_verified',
    'Employment History': 'employment_history_verified',
    'Income': 'income_history_verified',
    'Identity': 'identity_verified',
    'Pets': 'pets_verified'
}

function ContentTitle({ content, handleCommentsClick }) {
    const { companyId, propertyId, renterId } = useParams()
    const { verified, setVerified } = useGetApplicationSectionVerifiedByID(companyId, propertyId, renterId, contentSection[content])
    
    const updateVerification = useUpdateApplicationStatusByID()
    async function handleVerification(status) {
        await updateVerification(companyId, propertyId, renterId, contentSection[content], status)
        setVerified(status)
    }

    return (
        <Grid container alignItems='center'>
            <Grid item xs={6}>
                <Typography variant='h4' id={content}>{content}</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent='flex-end'>
                <Box>
                    <Button variant='contained' color='primary' disabled={verified} style={{ backgroundColor: verified ? 'green' : 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification(true)}>
                        <Check />
                    </Button>
                    <Button variant='contained' color='primary' disabled={!verified} style={{ backgroundColor: verified ? 'grey' : 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification(false)}>
                        <Close />
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => handleCommentsClick(content)}>
                        <Chat />
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ContentTitle