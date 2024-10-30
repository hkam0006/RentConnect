import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetPendingCompanyJoinRequestByCompanyID = (companyId) =>{
    const [joinRequests, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinRequests = async () => {
            if (companyId) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("COMPANY-JOIN-REQUEST")
                    .select("*")
                    .eq("company_id", companyId)
                    .eq("request_status", "pending");

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
        fetchJoinRequests();
    }, [companyId]);
    return {joinRequests, loading};
};

export default useGetPendingCompanyJoinRequestByCompanyID;