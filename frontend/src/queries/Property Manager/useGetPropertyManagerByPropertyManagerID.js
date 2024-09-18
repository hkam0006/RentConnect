import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetPropertyManagerByPropertyManagerID = (pm_id) =>{
    const [propertyManager, setPropertyManager] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyManager = async () => {
            if (pm_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("PROPERTY MANAGER")
                    .select("*")
                    .eq("property_manager_id", pm_id);

                if (error) {
                    setLoading(false);
                    setPropertyManager([]);
                } else {
                    setLoading(false);
                    setPropertyManager(data || []);
                }
            } else {
                setLoading(false);
                setPropertyManager([]);
            }
        }
        fetchPropertyManager();
    }, [pm_id]);
    return {propertyManager, loading};
};

export default useGetPropertyManagerByPropertyManagerID;