import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPropertyNotesByPropertyID = (property_id) =>{
    const [property_note, setPropertyNotes] = useState([]);
  
    useEffect(() => {
      const fetchPropertyNotes = async () => {
        const { data, error } = await supabase
        .from("PROPERTY NOTE")
        .select("*")
        .eq("property_id", property_id);
  
        if (error) {
          console.error("Error fetching property notes:", error.message);
        } else {
          setPropertyNotes(data);
        }
      };
  
      fetchPropertyNotes();
    }, []);
      return property_note;
    };

export default useGetPropertyNotesByPropertyID;