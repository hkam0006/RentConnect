import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useSearchProperty = (property_suburbs = NULL, property_state = NULL, min_property_bedroom_count = 0, max_property_bedroom_count = 1000, min_property_bathroom_count = 0, max_property_bathroom_count = 1000, min_property_car_spot_count = 0, max_property_car_spot_count = 1000, property_type = NULL, min_property_rent = 0, max_property_rent = 10000000, min_property_footprin = 0, max_property_footprint = 100000000) =>{
    const [property, setProperties] = useState([]);
  
    useEffect(() => {
      const fetchProperties = async () => {
        if (property_suburb != NULL && property_state != NULL && property_type != NULL){
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint)
            .eq("property_suburb", property_suburb)
            .eq("property_state", property_state)
            .eq("property_type", property_type);
        }
        else if (property_suburb != NULL && property_state != NULL && property_type == NULL){
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint)
            .eq("property_suburb", property_suburb)
            .eq("property_state", property_state);
        }
        else if (property_suburb != NULL && property_state == NULL && property_type != NULL){
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint)
            .eq("property_suburb", property_suburb)
            .eq("property_type", property_type);
        }
        else if (property_suburb == NULL && property_state != NULL && property_type != NULL){
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint)
            .eq("property_state", property_state)
            .eq("property_type", property_type);
        }
        else if (property_suburb != NULL && property_state == NULL && property_type == NULL){
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint)
            .eq("property_suburb", property_suburb);
        }
        else if (property_suburb == NULL && property_state != NULL && property_type == NULL){
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint)
            .eq("property_state", property_state);
        }
        else if (property_suburb == NULL && property_state == NULL && property_type != NULL){
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint)
            .eq("property_type", property_type);
        }
        else{
            const { data, error } = await supabase
            .from("PROPERTY")
            .select("*")
            .gte("property_bedroom_count", min_property_bedroom_count)
            .lte("property_bedroom_count", max_property_bedroom_count)
            .gte("property_bathroom_count", min_property_bathroom_count)
            .lte("property_bathroom_count", max_property_bathroom_count)
            .gte("property_car_spot_count", min_property_car_spot_count)
            .lte("property_car_spot_count", max_property_car_spot_count)
            .gte("property_rent", min_property_rent)
            .lte("property_rent", max_property_rent)
            .gte("property_footprint", min_property_footprint)
            .lte("property_footprint", max_property_footprint);
        }
        
        if (error) {
          console.error("Error fetching property:", error.message);
        } else {
          setProperties(data);
        }
      };
  
      fetchProperties();
    }, []);
      return property;
    };

export default useSearchProperty;