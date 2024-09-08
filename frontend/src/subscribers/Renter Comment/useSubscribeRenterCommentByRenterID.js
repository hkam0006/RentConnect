import { useEffect } from "react";
import { supabase } from "../../supabase";

const useSubscribeRenterCommentByRenterID = (renterID, callback) => {
  useEffect(() => {
    console.log('Setting up subscription for renterID:', renterID); // Debugging log

    const channel = supabase
      .channel("renter-comments-update")
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: "renter_comment", // Ensure the table name is correct
          //filter: `renter_id=eq.${renterID}`
        },
        (payload) => {
          console.log('New comment payload:', payload); // Debugging log
          callback(payload);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscription to renter_comment table successful');
        } else {
          console.error('Subscription error:', status);
        }
      });

    return () => {
      console.log('Removing subscription for renterID:', renterID); // Debugging log
      supabase.removeChannel(channel);
    };
  }, [renterID, callback]);

  return null;
};

export default useSubscribeRenterCommentByRenterID;