import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

/**
 * Returns all properties matching the provided propertyIDs. Follows the order of the
 * IDs provided.
 *
 * @param {[String]} property_ids array containing all propertyIDs
 * @return {Properties, boolean}  array containing properties
 * @author Luke Phillips
 */
const useGetPropertiesByPropertyIDs = (property_ids) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            if (property_ids && property_ids.length > 0) {
                setLoading(true);
                const { data, error } = await supabase
                    .from("PROPERTY")
                    .select("*")
                    .in("property_id", property_ids);

                if (error) {
                    console.error('Error finding properties:', error);
                    setProperties([]);
                } else {
                    // Sort the properties based on the order of property_ids
                    const sortedProperties = property_ids.map(id =>
                        data.find(property => property.property_id === id)
                    );
                    setProperties(sortedProperties);
                }

                setLoading(false);
            } else {
                setLoading(false);
                setProperties([]);
            }
        };

        fetchProperties();
    }, []);

    return { properties, loading };
}

export default useGetPropertiesByPropertyIDs;
