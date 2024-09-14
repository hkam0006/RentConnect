import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useRemoveApplicationSupportingDocument = () => {
    const removeApplicationSupportingDocument = useCallback(async (application_supporting_document_id, renter_id) => {
        if (application_supporting_document_id && renter_id) {
            const { data, error } = await supabase
                .from('APPLICATION-SUPPORTING-DOCUMENT')
                .delete()
                .eq('application_supporting_document_id', application_supporting_document_id)
                .eq('renter_id', renter_id)
            if (error) {
                throw error
            }
            return data
        }
    }, [])

    return removeApplicationSupportingDocument
}

export default useRemoveApplicationSupportingDocument