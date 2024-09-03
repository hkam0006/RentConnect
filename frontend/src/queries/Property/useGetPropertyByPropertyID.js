import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

const useGetPropertyByPropertyID = (property_id) => {
    const [property, setProperty] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            if (property_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("PROPERTY")
                    .select("*")
                    .eq("property_id", property_id);

                if (error) {
                    console.error('Error finding applications:', error);
                    setProperty([]); // Handle the error case by setting applications to an empty array
                } else {
                    setProperty(data || []); // Ensure data is always an array
                }

                setLoading(false);
            } else {
                setLoading(false); // Ensure loading is false if renter_id is not provided
                setProperty([]); // Clear applications if no renter_id is provided
            }
        };

        fetchProperty();
    }, [property_id]);

    return { property, loading };
}

export default useGetPropertyByPropertyID;