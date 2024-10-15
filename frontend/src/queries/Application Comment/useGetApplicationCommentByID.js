import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationCommentByID = (property_id, renter_id, company_id) =>{
  const [applicationComments, setApplicationComments] = useState([]);

  useEffect(() => {
    const fetchApplicationComments = async () => {
      const { data, error } = await supabase
      .from("APPLICATION-COMMENT")
      .select("*")
      .eq("property_id", property_id)
      .eq("renter_id", renter_id)
      .eq("company_id", company_id);

      if (error) {
        console.error("Error fetching application supporting documents:", error.message);
      } else {
          setApplicationComments(data);
      }
    };

    fetchApplicationComments();
  }, [property_id, renter_id, company_id]);
  return { applicationComments, setApplicationComments };
};

export default useGetApplicationCommentByID;