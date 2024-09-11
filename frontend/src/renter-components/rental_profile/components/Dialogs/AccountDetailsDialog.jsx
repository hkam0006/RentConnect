import React, { useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert, CircularProgress, Snackbar, Backdrop  } from '@mui/material'
import useUpdateRenterByRenterID from '../../../../mutators/Renter/useUpdateRenterByRenterID'

function AccountDetailsDialog({ renter, closeDialog }) {
    const [formData, setFormData] = useState(renter)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const updateRenterDB = useUpdateRenterByRenterID()
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

        if (!formData.renter_first_name || !formData.renter_last_name || !formData.renter_email || !formData.renter_phone_number) {
            setError('All fields are required.')
            setLoading(false)
            return
        }
        if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.renter_email)) {
            setError('Invalid email format.')
            setLoading(false)
            return
        }
        if (!/^\d+$/.test(formData.renter_phone_number)) {
            setError('Phone number must contain only digits.')
            setLoading(false)
            return
        }

        updateRenterDB(renter.renter_id, formData.renter_first_name, formData.renter_last_name, formData.renter_email, formData.renter_phone_number)
            .then(() => {
                setError('')
                closeDialog()
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to update rental details')
                setLoading(false)
            }
        )
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
            <DialogTitle>Update Account Details</DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='column' gap={2} sx={{ padding: 1 }}>
                    <TextField
                        label='First Name'
                        name='renter_first_name'
                        value={formData.renter_first_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Last Name'
                        name='renter_last_name'
                        value={formData.renter_last_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Email'
                        name='renter_email'
                        type='email'
                        value={formData.renter_email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Phone'
                        name='renter_phone_number'
                        value={formData.renter_phone_number}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
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

export default AccountDetailsDialog
