import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetCompanyJoinRequestByPropertyManagerID = (pm_id) =>{
    const [joinRequest, setJoinRequest] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinRequest = async () => {
            if (pm_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("COMPANY JOIN REQUEST")
                    .select("*")
                    .eq("property_manager_id", pm_id);

                if (error) {
                    setLoading(false);
                    setJoinRequest({});
                } else {
                    setLoading(false);
                    setJoinRequest(data[0] || {});
                }
            } else {
                setLoading(false);
                setJoinRequest({});
            }
        }
        fetchJoinRequest();
    }, [pm_id]);
    return {joinRequest, loading};
};

export default useGetCompanyJoinRequestByPropertyManagerID;