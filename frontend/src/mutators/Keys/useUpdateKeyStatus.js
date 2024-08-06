import { supabase } from "../../supabase";

const useUpdateKeyStatus = (keyId) => {
  const checkInKey = async (keyId) => {
    const {data ,error} = await supabase
      .from('KEY')
      .update([
        {
          key_status: "Returned",
          key_issued: null,
          key_due: null
        },
      ])
      .eq("key_id", keyId)
    return {data, error}
  }
  
  const checkOutKey = async (keyId, dueDate, issueDate) => {
    const {data, error } = await supabase
      .from('KEY')
      .update([
        {
          key_status: "On Loan",
          key_issued: issueDate,
          key_due: dueDate
        },
      ])
      .eq("key_id", keyId)

    return {data, error}
  }

  return {checkInKey, checkOutKey}
}

export default useUpdateKeyStatus;