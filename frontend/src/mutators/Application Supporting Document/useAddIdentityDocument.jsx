import { supabase } from "../../supabase"
import { useCallback } from 'react'

const useAddIdentityDocument = () => {
    const addIdentityDocument = useCallback(async (file, user_id) => {
        if (!(file instanceof File)) {
            throw new Error('Invalid input: Expected a File object');
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${user_id}/${fileName}`

        try {
            const { data, error } = await supabase.storage
                .from('IDENTITY-DOCUMENTS')
                .upload(filePath, file)

            if (error) throw error

            const { data: { publicUrl }, error: urlError } = supabase.storage
                .from('IDENTITY-DOCUMENTS')
                .getPublicUrl(filePath)

            if (urlError) throw urlError

            return publicUrl
        } catch (error) {
            console.error('Error uploading file:', error)
            throw error
        }
    }, [])

    return addIdentityDocument
}

export default useAddIdentityDocument