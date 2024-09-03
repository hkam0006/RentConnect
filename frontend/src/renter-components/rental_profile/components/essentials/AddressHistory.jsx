import { Paper } from '@mui/material'
import useGetPreviousTenanciesByRenterID from '../../../../queries/Previous Tenancy/useGetPreviousTenanciesByRenterID'
import PreviousTenancyCard from './AddressHistoryCard'
import ContentTitle from './ContentTitle'

function AddressHistory({ userID }) {
    const previousTenancies = useGetPreviousTenanciesByRenterID(userID)
    function addAddressHistory() {
        console.log('lets add an address history')
    }

    return (
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ContentTitle title={'Address History'} addOnClick={addAddressHistory} />
            {previousTenancies && (
                previousTenancies.map(previousTenancy => (
                    <PreviousTenancyCard key={previousTenancy.id} previousTenancy={previousTenancy} />
                ))
            )}
        </Paper>
    )
}

export default AddressHistory
