import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

const useGetApplicationSupportingDocumentsByRenterID = (renter_id) =>{
    const [applicationSupportingDocuments, setApplicationSupportingDocuments] = useState(null);
    const [loading, setLoading] = useState(true);
  
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
          setLoading(false);
        }
      };
  
      fetchApplicationSupportingDocuments();
    }, [renter_id]);
      return { applicationSupportingDocuments, setApplicationSupportingDocuments, loading };
    };

export default useGetApplicationSupportingDocumentsByRenterID;