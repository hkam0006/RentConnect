import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useRemoveIdentityDocument = () => {
    const removeIdentityDocument = useCallback(async (user_id, file_url) => {
        if (user_id && file_url) {
            const parts = file_url.split('/IDENTITY-DOCUMENTS/')
            if (parts.length < 2) {
                throw new Error('Invalid file URL: Could not extract file path')
            }
            const filePath = parts[1]
            
            try {
                const { data, error } = await supabase.storage
                    .from('IDENTITY-DOCUMENTS')
                    .remove([filePath])

                if (error) throw error

                return data
            } catch (error) {
                console.error('Error removing file:', error)
                throw error
            }
        }
    }, [])

    return removeIdentityDocument
}

export default useRemoveIdentityDocument