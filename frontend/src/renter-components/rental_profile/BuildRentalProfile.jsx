import { Box } from '@mui/material'

import NavigationMenu from '../navigation_menu/NavigationMenus'
import AccountDetails from './components/AccountDetails'
import Essentials from './components/Essentials'
import AdditionalSupportingDocuments from './components/AdditionalSupportingDocuments'
import AppLoader from "../../manager-components/property_page/AppLoader"
import useGetUserID from "../../queries/useGetUserID"

function BuildRentalProfile() {
    const {userID, loading: userLoading} = useGetUserID()

    if (userLoading) { return <AppLoader />}

    return (
        <Box sx={{ padding: 2 }}>
            <NavigationMenu />
            <Box display="flex" justifyContent="center">
                <Box margin={2} sx={{ width: '50%', marginTop: '64px', marginLeft: '190px' }} >
                    <AccountDetails userID={userID}/>
                    <Essentials userID={userID}/>
                    <AdditionalSupportingDocuments userID={userID}/>
                </Box>
            </Box>
        </Box>
    )
}

export default BuildRentalProfile