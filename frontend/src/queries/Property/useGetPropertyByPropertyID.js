import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPropertyByPropertyID = (property_id) =>{
    const fetchProperty = async () => {
        const {data, error } = await supabase
          .from("PROPERTY")
          .select("*")
          .eq("property_id", property_id);

          return { data, error }
    };
  
    return { fetchProperty };
};

export default useGetPropertyByPropertyID;