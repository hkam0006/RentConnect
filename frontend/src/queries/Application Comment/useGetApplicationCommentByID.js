import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationCommentByID = (property_id, renter_id) =>{
    const [application_comments, setApplicationComments] = useState([]);
  
    useEffect(() => {
      const fetchApplicationComments = async () => {
        const { data, error } = await supabase
        .from("APPLICATION COMMENT")
        .select("*")
        .eq("property_id", property_id)
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching application supporting documents:", error.message);
        } else {
            setApplicationComments(data);
        }
      };
  
      fetchApplicationComments();
    }, []);
      return application_comments;
    };

export default useGetApplicationCommentByID;