import {supabase} from "../supabase";

const useGetUserID = () => {

    const fetchUserID = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            return session.user.id;  // Return the user ID
        } else {
            console.log("No user session found.");
            return null;
        }
    }

    return {fetchUserID};
};

export default useGetUserID;