import { supabase } from "../../supabase";

const useAddApplicationComment = () => {
  const AddApplicationComment = async (renterId, propertyId, companyId, comment, userID, currentDate, type_verified) => {
    try {
        const { data, error } = await supabase
            .from("APPLICATION-COMMENT")
            .insert([{
              renter_id: renterId,
              property_id: propertyId,
              company_id: companyId,
              application_comment_contents: comment,
              property_manager_id: userID,
              application_comment_date: currentDate,
              type: type_verified
          }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return AddApplicationComment;
}

export default useAddApplicationComment
