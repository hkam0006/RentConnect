import { useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert, CircularProgress, Snackbar, Backdrop, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material'
import useAddPet from '../../../../mutators/Pet/useAddPet'
import useUpdatePet from '../../../../mutators/Pet/useUpdatePetByID'
import useRemovePet from '../../../../mutators/Pet/useRemovePetByID'

function PetsDialog({ pet, closeDialog, isUpdate }) {
    const [formData, setFormData] = useState(pet)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const addPetDB = useAddPet()
    const updatePetDB = useUpdatePet()
    const removePet = useRemovePet()

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

        if (!formData.pet_name) {
            setError('Pet name is required.')
            setLoading(false)
            return
        }

        const pet_age = parseInt(formData.pet_age)
        if (isNaN(pet_age) || pet_age < 0) {
            setError('Invalid pet age.')
            setLoading(false)
            return
        }

        if (isUpdate) {
            updatePetDB(pet.pet_id, pet.renter_id, formData.pet_species, pet_age, formData.pet_is_desexed, formData.pet_microchip_number, formData.pet_registration_number, formData.pet_name, formData.pet_indoor_status)
                .then(() => {
                    setError('')
                    closeDialog()
                    setLoading(false)
                })
                .catch(() => {
                    setError('Failed to update pet details')
                    setLoading(false)
                })
        } else {
            addPetDB(pet.renter_id, formData.pet_species, pet_age, formData.pet_is_desexed, formData.pet_microchip_number, formData.pet_registration_number, formData.pet_name, formData.pet_indoor_status)
                .then(() => {
                    setError('')
                    closeDialog()
                    setLoading(false)
                })
                .catch(() => {
                    setError('Failed to add pet')
                    setLoading(false)
                })
        }
    }

    const remove = () => {
        setLoading(true)
        removePet(pet.pet_id, pet.renter_id)
            .then(() => {
                setError('')
                closeDialog()
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to remove pet')
                setLoading(false)
            })
    }

    const handleDesexedChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            pet_is_desexed: event.target.checked
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
            <DialogTitle>{isUpdate ? 'Update Pet Details' : 'Add Pet Details'}</DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='column' gap={2} sx={{ padding: 1 }}>
                    <TextField
                        label='Pet Name'
                        name='pet_name'
                        value={formData.pet_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Pet Species'
                        name='pet_species'
                        value={formData.pet_species}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Pet Age'
                        name='pet_age'
                        value={formData.pet_age}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="indoor-status-label">Indoors Status</InputLabel>
                        <Select
                            labelId="indoor-status-label"
                            id="indoor-status"
                            name="pet_indoor_status"
                            value={formData.renter_employment_type || ''}
                            onChange={handleChange}
                            label="Indoors Status"
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="Indoors">Indoors</MenuItem>
                            <MenuItem value="Outdoors">Outdoors</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.pet_is_desexed}
                                onChange={handleDesexedChange}
                                name="pet_is_desexed"
                            />
                        }
                        label="Desexed"
                    />
                    <TextField
                        label='Microchip Number'
                        name='pet_microchip_number'
                        value={formData.pet_microchip_number}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label='Registration Number'
                        name='pet_registration_number'
                        value={formData.pet_registration_number}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => remove()} color='warning'>
                    Remove
                </Button>
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

export default PetsDialog
