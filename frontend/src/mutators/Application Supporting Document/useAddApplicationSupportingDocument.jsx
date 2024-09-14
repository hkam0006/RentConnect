import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useAddApplicationSupportingDocument = () => {
    const addApplicationSupportingDocument = useCallback(async (renter_id, application_supporting_document_type, application_supporting_document_link) => {
        if (renter_id && application_supporting_document_type && application_supporting_document_link) {
            const { data, error } = await supabase
                .from('APPLICATION-SUPPORTING-DOCUMENT')
                .insert([{
                    renter_id,
                    application_supporting_document_type, 
                    application_supporting_document_link, 
                }])
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return addApplicationSupportingDocument
}

export default useAddApplicationSupportingDocument