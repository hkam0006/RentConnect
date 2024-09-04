import {supabase} from "../../supabase";
import {useEffect, useState} from "react";

const useGetApplicationByPropertyAndUserID = (property_id, renter_id) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            if (property_id && renter_id) {
                setLoading(true);
                const {data, error} = await supabase
                    .from("APPLICATION")
                    .select("*")
                    .eq("property_id", property_id)
                    .eq("renter_id", renter_id)

                if (error) {
                    console.error('Error finding applications:', error);
                    setApplications([]); // Handle the error case by setting applications to an empty array
                } else {
                    setApplications(data || []); // Ensure data is always an array
                }

                setLoading(false);
            } else {
                setLoading(false); // Ensure loading is false if renter_id is not provided
                setApplications([]); // Clear applications if no renter_id is provided
            }
        };

        fetchApplications();
    }, [property_id, renter_id]);

    return { applications, loading };
}

export default useGetApplicationByPropertyAndUserID;