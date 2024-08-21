import { supabase } from "../../supabase";


const useGetPropertiesByPropertyIDs = (property_ids) =>{

    const fetchProperties = async () => {
        const {data, error} = await supabase
            .from("PROPERTY")
            .select("*")
            .in("property_id", property_ids)

        return {data, error}
    }

    return {fetchProperties};
};

export default useGetPropertiesByPropertyIDs;