import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { supabase } from "../../supabase";
import { useEffect, useState } from 'react';

export default function InspectionRequestModal({ open, handleClose, data, setData, handleSubmit, propertyID, companyID }) {

    const [inspectionData, setInspectionData] = useState({
        Inspection_run_id: '1',
        company_id: companyID,
        inspection_duration: 15, 
        inspection_buffer: 5, 
        inspection_type: 'pending',
        property_id: propertyID,
        renter_id: '', 
        inspection_date_time: '', 
        renter_msg: null,
        pm_msg: null
    });

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (user) {
                setInspectionData(prevState => ({
                    ...prevState,
                    renter_id: user.id
                }));
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setInspectionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInspectionSubmit = async () => {
        const { error } = await supabase
            .from('INSPECTION')
            .insert([inspectionData]);

        if (error) {
            console.error('Error inserting inspection: ', error.message);
        } else {
            console.log('Inspection added successfully');
            handleSubmit();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Request Inspection</DialogTitle>
            <DialogContent>
                <TextField
                    label="Inspection Date"
                    name="inspection_date_time"
                    type="datetime-local"
                    onChange={handleInputChange}
                    value={inspectionData.inspection_date_time}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleInspectionSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}
