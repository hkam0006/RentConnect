import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';


const useGetPetsByRenterID = (renter_id) =>{
    const [pets, setPets] = useState([]);
  
    useEffect(() => {
      const fetchPets = async () => {
        const { data, error } = await supabase
        .from("PET")
        .select("*")
        .eq("renter_id", renter_id);
  
        if (error) {
          console.error("Error fetching pets:", error.message);
        } else {
            setPets(data);
        }
      };
  
      fetchPets();
    }, [renter_id]);
      return pets;
    };

export default useGetPetsByRenterID;