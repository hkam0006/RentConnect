import {supabase} from '../../supabase'

const useDeleteMultipleKeys = () => {
  const deleteKeys = async (messages) => {
    const {data ,error} = await supabase
      .from("KEY")
      .delete()
      .in('key_id', messages)
    return {data, error}
  }
  return deleteKeys
}

export default useDeleteMultipleKeys;