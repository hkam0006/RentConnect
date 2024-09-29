import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetRenterCommentsByRenterID = (renter_id) =>{
    const [renter_comment, setRenterComment] = useState([]);
  
    useEffect(() => {
      const fetchRenterComments = async () => {
        const { data, error } = await supabase
        .from("RENTER-COMMENT")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching renter comments:", error.message);
        } else {
          setRenterComment(data);
        }
      };
  
      fetchRenterComments();
    }, [renter_id]);
      return renter_comment;
    };

export default useGetRenterCommentsByRenterID;