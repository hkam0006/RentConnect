import { supabase } from "../../supabase";

const useAddRenterComment = () =>{
  const addRenterComment = async (property_manager_id, renter_id, company_id, renter_comment_contents) => {
    const { data, error } = await supabase
      .from("RENTER COMMENT")
      .insert({
        property_manager_id: property_manager_id,
        renter_id: renter_id,
        company_id: company_id,
        renter_comment_contents: renter_comment_contents
      });

    return {data, error}
  };
  return addRenterComment
};

export default useAddRenterComment;