import { useState } from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert, CircularProgress, Snackbar, Backdrop, Input } from '@mui/material'
import useAddIdentityDocument from '../../../../mutators/Application Supporting Document/useAddIdentityDocument'
import useRemoveIdentityDocument from '../../../../mutators/Application Supporting Document/useRemoveIdentityDocument'
import useAddApplicationSupportingDocument from '../../../../mutators/Application Supporting Document/useAddApplicationSupportingDocument'
import useUpdateApplicationSupportingDocument from '../../../../mutators/Application Supporting Document/useUpdateApplicationSupportingDocumentByID'
import useRemoveApplicationSupportingDocument from '../../../../mutators/Application Supporting Document/useRemoveApplicationSupportingDocumentByID'

function IdentityDialog({ document, identityType, closeDialog, isUpdate }) {
    console.log()
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState(document.application_supporting_document_link);

    const addIdentityDocument = useAddIdentityDocument()
    const removeIdentityDocument = useRemoveIdentityDocument()

    const addApplicationSupportingDocument = useAddApplicationSupportingDocument()
    const updateApplicationSupportingDocument = useUpdateApplicationSupportingDocument()
    const removeApplicationSupportingDocument = useRemoveApplicationSupportingDocument()

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        setUploadedImageUrl(URL.createObjectURL(selectedFile))
    }
    
    const validate = () => {
        setLoading(true)
        setError('')

        if (!file) {
            setError('Please upload an image')
            setLoading(false)
            return
        }

        addIdentityDocument(file, document.renter_id)
            .then((uploadedUrl) => {
                if (isUpdate) {
                    updateApplicationSupportingDocument(document.application_supporting_document_id, document.renter_id, identityType, uploadedUrl)
                    .then(() => {
                        removeIdentityDocument(document.renter_id, document.application_supporting_document_link)
                        setError('')
                        closeDialog()
                        setLoading(false)
                    })
                    .catch(error => {
                        setError('Failed to add identity document')
                        console.error(error)
                        setLoading(false)
                    })
                } else {
                    addApplicationSupportingDocument(document.renter_id, identityType, uploadedUrl)
                    .then(() => {
                        setError('')
                        closeDialog()
                        setLoading(false)
                    })
                    .catch(error => {
                        setError('Failed to add identity document')
                        console.error(error)
                        setLoading(false)
                    })
                }
                
            })
            .catch(error => {
                setError('Failed to upload image')
                console.error(error)
                setLoading(false)
            })
    }

    const remove = () => {
        setLoading(true)
        removeApplicationSupportingDocument(document.application_supporting_document_id, document.renter_id)
            .then(() => {
                removeIdentityDocument(document.renter_id, document.application_supporting_document_link)
                setError('')
                closeDialog()
                setLoading(false)
            })
            .catch(error => {
                setError('Failed to remove identity document')
                console.error(error)
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
            <DialogTitle>{isUpdate ? 'Update Identity Document' : 'Add Identity Document'}</DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='column' gap={2} sx={{ padding: 1 }}>
                    <Input
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {uploadedImageUrl && (
                        <img src={uploadedImageUrl} alt="Uploaded Image" />
                    )}
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

export default IdentityDialog