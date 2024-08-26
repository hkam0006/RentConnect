import {supabase} from "../../supabase";

const useGetApplicationByPropertyAndUserID = (property_id, renter_id) => {

    const fetchApplications = async () => {
        const {data, error} = await supabase
            .from("APPLICATION")
            .select("*")
            .eq("property_id", property_id)
            .eq("renter_id", renter_id)

        return {data, error}
    }

    return {fetchApplications};
};

export default useGetApplicationByPropertyAndUserID;