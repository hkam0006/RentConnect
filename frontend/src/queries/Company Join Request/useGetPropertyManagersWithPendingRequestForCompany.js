import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetPropertyManagersWithPendingRequestForCompany = (companyId) =>{
    const [propertyManagers, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyManagers = async () => {
            if (companyId) {
                setLoading(true);
                const { data: pmIDs, error: pmIDsError } = await supabase
                    .from("COMPANY JOIN REQUEST")
                    .select("*")
                    .eq("company_id", companyId)
                    .eq("request_status", "pending");

                if (pmIDsError) {
                    console.error("Error fetching property manager ids:", pmIDsError.message)
                    setLoading(false);
                    return;
                }
                var propertyManagersList = [];
                for (var i = 0; i < pmIDs.length; i++){
                    const { data: propertyManager, error:propertyManagerError } = await supabase
                    .from("PROPERTY MANAGER")
                    .select("*")
                    .eq("property_manager_id", pmIDs[i].property_manager_id)
                    if (propertyManagerError) {
                        console.error("Error fetching property managers:", propertyManagerError.message)
                        setLoading(false);
                        return;
                    }
                    else{
                        propertyManagersList.push(propertyManager[0]);
                    }  
                }

                setLoading(false);
                setJoinRequests(propertyManagersList || []);
                
            } else {
                setLoading(false);
                setJoinRequests([]);
            }
        }
        fetchPropertyManagers();
    }, [companyId]);
    return {joinRequests: propertyManagers, loading};
};

export default useGetPropertyManagersWithPendingRequestForCompany;