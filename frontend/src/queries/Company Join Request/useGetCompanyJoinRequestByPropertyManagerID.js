import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetCompanyJoinRequestByPropertyManagerID = (pm_id) =>{
    const [joinRequests, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinRequest = async () => {
            if (pm_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("COMPANY-JOIN-REQUEST")
                    .select("*")
                    .eq("property_manager_id", pm_id);

                if (error) {
                    setLoading(false);
                    setJoinRequests([]);
                } else {
                    setLoading(false);
                    setJoinRequests(data || []);
                }
            } else {
                setLoading(false);
                setJoinRequests([]);
            }
        }
        fetchJoinRequest();
    }, [pm_id]);
    return {joinRequests, loading};
};

export default useGetCompanyJoinRequestByPropertyManagerID;