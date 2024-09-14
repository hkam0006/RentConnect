import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

const useGetApplicationSupportingDocumentsByRenterID = (renter_id) =>{
    const [application_supporting_documents, setApplicationSupportingDocuments] = useState([]);
  
    useEffect(() => {
      const fetchApplicationSupportingDocuments = async () => {
        if (renter_id) {
          const { data, error } = await supabase
          .from("APPLICATION-SUPPORTING-DOCUMENT")
          .select("*")
          .eq("renter_id", renter_id);
    
          if (error) {
            console.error("Error fetching application supporting documents:", error.message);
          } else {
            setApplicationSupportingDocuments(data);
          }
        }
      };
  
      fetchApplicationSupportingDocuments();
    }, [renter_id]);
      return application_supporting_documents;
    };

export default useGetApplicationSupportingDocumentsByRenterID;