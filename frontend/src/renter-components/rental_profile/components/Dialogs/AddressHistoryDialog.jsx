import { useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert, CircularProgress, Snackbar, Backdrop  } from '@mui/material'
import useUpdatePreviousTenancy from '../../../../mutators/Previous Tenancy/useUpdatePreviousTenancyByID'
import useAddPreviousTenancy from '../../../../mutators/Previous Tenancy/useAddPreviousTenancy'
import useRemovePreviousTenancy from '../../../../mutators/Previous Tenancy/useRemovePreviousTenancyByID'

function AddressHistoryDialog({ addressHistory, closeDialog, isUpdate }) {
    const [formData, setFormData] = useState(addressHistory)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const updatePreviousTenancyDB = useUpdatePreviousTenancy()
    const addPreviousTenancyDB = useAddPreviousTenancy()
    const removePreviousTenancy = useRemovePreviousTenancy()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const validate = () => {
        setLoading(true)
        setError('')

        if (!formData.previous_tenancy_address || !formData.previous_tenancy_contact_name || !formData.previous_tenancy_contact_email || !formData.previous_tenancy_contact_phone) {
            setError('All fields are required.')
            setLoading(false)
            return
        }
        if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.previous_tenancy_contact_email)) {
            setError('Invalid email format.')
            setLoading(false)
            return
        }
        if (!/^\d+$/.test(formData.previous_tenancy_contact_phone)) {
            setError('Phone number must contain only digits.')
            setLoading(false)
            return
        }

        if (isUpdate) {
            updatePreviousTenancyDB(addressHistory.previous_tenancy_id, addressHistory.renter_id, formData.previous_tenancy_address, formData.previous_tenancy_contact_name, formData.previous_tenancy_contact_email, formData.previous_tenancy_contact_phone)
                .then(() => {
                    setError('')
                    closeDialog()
                    setLoading(false)
                })
                .catch(() => {
                    setError('Failed to update address history details')
                    setLoading(false)
                })
        } else {
            addPreviousTenancyDB(addressHistory.renter_id, formData.previous_tenancy_address, formData.previous_tenancy_contact_name, formData.previous_tenancy_contact_email, formData.previous_tenancy_contact_phone)
                .then(() => {
                    setError('')
                    closeDialog()
                    setLoading(false)
                })
                .catch(() => {
                    setError('Failed to add address history details')
                    setLoading(false)
                })
        }
    }

    const remove = () => {
        setLoading(true)
        setError('')

        removePreviousTenancy(addressHistory.previous_tenancy_id, addressHistory.renter_id)
            .then(() => {
                setError('')
                closeDialog()
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to remove address history')
                setLoading(false)
            })
    }
    
    return (
        <Dialog open={true} onClose={closeDialog}>
            {error && (
                <Snackbar open={error} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert severity='error'>{error}</Alert>
                </Snackbar>
            )}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle>{isUpdate ? 'Update Address History Details' : 'Add Address History Details'}</DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='column' gap={2} sx={{ padding: 1 }}>
                    <TextField
                        label='Address'
                        name='previous_tenancy_address'
                        value={formData.previous_tenancy_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Contact Name'
                        name='previous_tenancy_contact_name'
                        value={formData.previous_tenancy_contact_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Contact Email'
                        name='previous_tenancy_contact_email'
                        type='email'
                        value={formData.previous_tenancy_contact_email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Contact Phone'
                        name='previous_tenancy_contact_phone'
                        value={formData.previous_tenancy_contact_phone}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                {isUpdate && (
                    <Button onClick={() => remove()} color='warning'>
                        Remove
                    </Button>
                )}
                <Button onClick={() => closeDialog()} color='error'>
                    Cancel
                </Button>
                <Button onClick={validate}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddressHistoryDialog
