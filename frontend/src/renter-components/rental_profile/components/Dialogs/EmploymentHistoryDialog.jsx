import { useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert, CircularProgress, Snackbar, Backdrop, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material'
import useUpdateRenterEmployment from '../../../../mutators/Renter Employment/useUpdateRenterEmploymentByID'
import useAddRenterEmployment from '../../../../mutators/Renter Employment/useAddRenterEmployment'
import useRemoveRenterEmployment from '../../../../mutators/Renter Employment/useRemoveRenterEmploymentByID'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

function EmploymentHistoryDialog({ employment, closeDialog, isUpdate }) {
    const [formData, setFormData] = useState({
        ...employment,
        renter_employment_start: employment.renter_employment_start ? dayjs(employment.renter_employment_start) : null,
        renter_employment_end: employment.renter_employment_end ? dayjs(employment.renter_employment_end) : null,
        currently_employed: employment.renter_employment_end === null
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const updateRenterEmployment = useUpdateRenterEmployment()
    const addRenterEmployment = useAddRenterEmployment()
    const removeRenterEmployment = useRemoveRenterEmployment()

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

        const start_date = formData.renter_employment_start.toISOString()
        const end_date = formData.currently_employed ? null : formData.end_date

        if (!formData.renter_employment_title || !formData.renter_employment_type || !formData.renter_employment_gross_income || !formData.renter_employment_net_income || 
            !start_date || (!end_date && !formData.currently_employed) || !formData.employer_name || 
            !formData.employer_phone || !formData.employer_email || !formData.renter_employment_location) {
            setError('All fields are required.')
            setLoading(false)
            return
        }
        if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.employer_email)) {
            setError('Invalid email format.')
            setLoading(false)
            return
        }
        if (!/^\d+$/.test(formData.employer_phone)) {
            setError('Phone number must contain only digits.')
            setLoading(false)
            return
        }

        if ((!/^\d+$/.test(formData.renter_employment_gross_income)) || !/^\d+$/.test(formData.renter_employment_net_income)) {
            setError('Income must contain only digits.')
            setLoading(false)
            return
        }
        
        if (isUpdate) {
            updateRenterEmployment(employment.renter_employment_id, employment.renter_id, formData.renter_employment_title, formData.renter_employment_type, formData.renter_employment_gross_income, formData.renter_employment_net_income,
                start_date, end_date, formData.employer_name, formData.employer_phone, formData.employer_email, formData.renter_employment_location)
                .then(() => {
                    setError('')
                    closeDialog()
                    setLoading(false)
                })
                .catch(() => {
                    setError('Failed to update employment history details')
                    setLoading(false)
                })
        } else {
            addRenterEmployment(employment.renter_id, formData.renter_employment_title, formData.renter_employment_type, formData.renter_employment_gross_income, formData.renter_employment_net_income,
                start_date, end_date , formData.employer_name, formData.employer_phone, formData.employer_email, formData.renter_employment_location)
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

        removeRenterEmployment(employment.renter_employment_id, employment.renter_id)
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

    const handleDateChange = (name) => (date) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: date
        }))
    }

    const handleCurrentlyEmployedChange = (event) => {
        const isCurrentlyEmployed = event.target.checked
        setFormData(prevData => ({
            ...prevData,
            currently_employed: isCurrentlyEmployed,
        }))
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
            <DialogTitle>{isUpdate ? 'Update Employment History Details' : 'Add Employment History Details'}</DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='column' gap={2} sx={{ padding: 1 }}>
                    <TextField
                        label='Employment Title'
                        name='renter_employment_title'
                        value={formData.renter_employment_title}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Employment Location'
                        name='renter_employment_location'
                        value={formData.renter_employment_location}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="employment-type-label">Employment Type</InputLabel>
                        <Select
                            labelId="employment-type-label"
                            id="employment-type"
                            name="renter_employment_type"
                            value={formData.renter_employment_type || ''}
                            onChange={handleChange}
                            label="Employment Type"
                        >
                            <MenuItem value="" disabled>Select Employment Type</MenuItem>
                            <MenuItem value="Full Time">Full Time</MenuItem>
                            <MenuItem value="Part Time">Part Time</MenuItem>
                            <MenuItem value="Casual">Casual</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label='Gross Income'
                        name='renter_employment_gross_income'
                        value={formData.renter_employment_gross_income}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Net Income'
                        name='renter_employment_net_income'
                        value={formData.renter_employment_net_income}
                        onChange={handleChange}
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField 
                        label="Start Date"
                        value={formData.renter_employment_start}
                        onChange={handleDateChange('renter_employment_start')}
                        fullWidth
                    />
                    <DateField 
                        label="End Date"
                        value={formData.renter_employment_end}
                        onChange={handleDateChange('renter_employment_end')}
                        fullWidth
                        disabled={formData.currently_employed}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.currently_employed}
                                onChange={handleCurrentlyEmployedChange}
                                name="currently_employed"
                            />
                        }
                        label="Currently Employed"
                    />
                    <TextField
                        label='Employer Name'
                        name='employer_name'
                        value={formData.employer_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Employer Phone'
                        name='employer_phone'
                        value={formData.employer_phone}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Employer Email'
                        name='employer_email'
                        value={formData.employer_email}
                        onChange={handleChange}
                        fullWidth
                    />
                </LocalizationProvider>
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

export default EmploymentHistoryDialog
