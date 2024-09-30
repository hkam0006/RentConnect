import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

const useGetNumberOfIDsByRenterID = (renter_id) => {
    const [IDs, setIDs] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchIDs = async () => {
            if (renter_id) {
                console.log('check')
                setLoading(true);
                const { count, error } = await supabase
                    .from('APPLICATION-SUPPORTING-DOCUMENT')
                    .select('*', { count: 'exact', head: true }) // Use 'head: true' to avoid fetching data, just get count
                    .eq('renter_id', renter_id)
                    .in('application_supporting_document_type', ['Drivers Licence', 'Passport']);

                if (error) {
                    console.log('Error fetching property:', error)
                    setIDs(0)
                } else {
                    setIDs(count);
                }

                setLoading(false);
            } else {
                setLoading(false);
                setIDs(0);
            }
        };
        fetchIDs();
    }, []);

    return { IDs, loading }
};

export default useGetNumberOfIDsByRenterID;