import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetCompanyIDByPropertyManagerID = (pm_id) =>{
    const [companyID, setCompanyID] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyID = async () => {
            if (pm_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("PROPERTY MANAGER COMPANY")
                    .select("company_id")
                    .eq("property_manager_id", pm_id);

                if (error) {
                    setLoading(false);
                    setCompanyID([]);
                } else {
                    setLoading(false);
                    setCompanyID(data[0].company_id || "");
                }
            } else {
                setLoading(false);
                setCompanyID("");
            }
        }
        fetchCompanyID();
    }, [pm_id]);
    return {companyID, loading};
};

export default useGetCompanyIDByPropertyManagerID;