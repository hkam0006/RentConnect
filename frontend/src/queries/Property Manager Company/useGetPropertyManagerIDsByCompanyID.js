import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetPropertyManagerIDsByCompanyID = (company_id) =>{
    const [propertyManagerIDs, setPropertyManagerIDs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyManagerIDs = async () => {
            if (pm_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("PROPERTY MANAGER COMPANY")
                    .select("property_manager_id")
                    .eq("company_id", company_id);

                if (error) {
                    setLoading(false);
                    setPropertyManagerIDs([]);
                } else {
                    setLoading(false);
                    setPropertyManagerIDs(data || []);
                }
            } else {
                setLoading(false);
                setPropertyManagerIDs([]);
            }
        }
        fetchPropertyManagerIDs();
    }, [company_id]);
    return {propertyManagerIDs, loading};
};

export default useGetPropertyManagerIDsByCompanyID;