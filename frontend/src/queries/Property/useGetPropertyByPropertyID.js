import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

const useGetPropertyByPropertyID = (property_id) => {
  const [property, setProperty] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperty = async () => {
      if (property_id) {
        setLoading(true);
        const { data, error } = await supabase
          .from("PROPERTY")
          .select("*")
          .eq("property_id", property_id);

        if (error) {
          console.log('Error fetching property:', error)
          setProperty([])
        } else {
          setProperty(data || []);
        }

        setLoading(false);
      } else {
        setLoading(false);
        setProperty([]);
      }
    };
    fetchProperty();
  }, [property_id]);
  
  return { property, loading }
};

export default useGetPropertyByPropertyID;