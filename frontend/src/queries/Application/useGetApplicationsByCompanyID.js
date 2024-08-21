import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetApplicationsByCompanyID = (company_id) =>{
    const fetchApplications = async () => {
        const {data, error} = await supabase
            .from("APPLICATION")
            .select("*")
            .eq("company_id", company_id)

        return {data, error}
    }

    return {fetchApplications};
};

export default useGetApplicationsByCompanyID;