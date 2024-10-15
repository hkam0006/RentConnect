import { useEffect } from "react";
import { supabase } from "../../supabase";

const useSubscribeApplicationCommentByRenterID = (property_id, renter_id, company_id, callback) => {
  useEffect(() => {
    const channel = supabase
      .channel("application-comments-update")
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: "APPLICATION-COMMENT",
          filter: `renter_id=eq.${renter_id}`,
          filter: `property_id=eq.${property_id}`,
          filter: `company_id=eq.${company_id}`,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
}, [property_id, renter_id, company_id, callback]);

  return null;
};

export default useSubscribeApplicationCommentByRenterID;
