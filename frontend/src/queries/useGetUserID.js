import {supabase} from "../supabase";
import {useEffect, useState} from "react";

/**
 * A React hook used to retrieve the UserID of the currently signed-in user.
 * @returns userID: user ID (null if no user can be found)
 * @returns loading: loading state of the DB call
 * @author Luke Phillips
 */
const useGetUserID = () => {
    const [userID, setUserID] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserID = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setUserID(session.user.id);
                setLoading(false)
            } else {
                console.log("No user session found.");
                setLoading(false);
            }
        }
        fetchUserID();
    }, []);

    return {userID, loading};
};

export default useGetUserID;