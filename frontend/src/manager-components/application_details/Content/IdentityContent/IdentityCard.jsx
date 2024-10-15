import { Box, Divider } from '@mui/material'

function IdentityCard({ document }) {
    return (
        <Box>
            <Box paddingBottom={2}>
                <Divider/>
            </Box>
            <img src={document.application_supporting_document_link} alt='identity' style={{ width: '95%', height: 'auto' }}/>
        </Box>
    )
}

export default IdentityCard