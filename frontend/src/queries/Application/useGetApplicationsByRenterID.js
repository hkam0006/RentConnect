import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByRenterID = (renter_id) =>{
    const fetchApplications = async () => {
        const {data, error} = await supabase
            .from("APPLICATION")
            .select("*")
            .eq("renter_id", renter_id)

        return {data, error}
    }

    return {fetchApplications};
};



export default useGetApplicationsByRenterID;