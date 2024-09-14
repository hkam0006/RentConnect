import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useUpdateApplicationSupportingDocument = () => {
    const updateApplicationSupportingDocument = useCallback(async (application_supporting_document_id, renter_id, application_supporting_document_type, application_supporting_document_link) => {
        if (application_supporting_document_id && renter_id && application_supporting_document_type && application_supporting_document_link) {
            const { data, error } = await supabase
                .from('APPLICATION-SUPPORTING-DOCUMENT')
                .update({
                    application_supporting_document_type,
                    application_supporting_document_link,
                })
                .eq('application_supporting_document_id', application_supporting_document_id)
                .eq('renter_id', renter_id)
                .select('*')
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return updateApplicationSupportingDocument
}

export default useUpdateApplicationSupportingDocument