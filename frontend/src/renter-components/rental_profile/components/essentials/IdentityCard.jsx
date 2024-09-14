import { useState } from 'react'
import { Typography } from '@mui/material'
import { Box, Button, Divider, Grid } from '@mui/material'
import IdentityDialog from '../Dialogs/IdentityDialog';
import EditIcon from '@mui/icons-material/Edit';


function IdentityCard({ document }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    function closeDialog() {
        setIsDialogOpen(false)
    }

    return (
        <>
            <Box>
                <Box paddingBottom={2}>
                    <Divider/>
                </Box>
                <Grid container alignItems='center'>
                    <Grid item xs={10}>
                        <img src={document.application_supporting_document_link} alt='identity' style={{ width: '95%', height: 'auto' }}/>
                    </Grid>
                    <Grid item xs={2} container justifyContent='flex-end'>
                        <Button variant='contained' color='primary' onClick={() => setIsDialogOpen(true)}>
                            <EditIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {isDialogOpen && <IdentityDialog document={document} identityType={document.application_supporting_document_type} closeDialog={closeDialog} isUpdate={true}/>}
        </>
    )
}

export default IdentityCard