import { supabase } from "../../supabase";
import {useEffect, useState} from "react";

const useGetRenterCommentsWithPMInfoByRenterID = (renter_id) =>{
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            if (renter_id) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("RENTER-COMMENT")
                    .select(
                        '*, "PROPERTY MANAGER"(*)'
                    )
                    .eq("renter_id", renter_id);

                if (error) {
                    setLoading(false);
                    setComments([]);
                } else {
                    setLoading(false);
                    setComments(data || []);
                }
            } else {
                setLoading(false);
                setComments([]);
            }
        }
        fetchComments()
    }, [renter_id]);
    return {comments, loading};
};

export default useGetRenterCommentsWithPMInfoByRenterID;