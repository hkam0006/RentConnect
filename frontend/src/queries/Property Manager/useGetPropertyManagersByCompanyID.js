import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'


const useGetPropertyManagersByCompanyID = (company_id) =>{
    const [property_managers, setPropertyManagers] = useState([])
  
    useEffect(() => {
      const fetchPropertyManagers = async () => {
        const { data: pmIDs, error:pmIDsError } = await supabase
        .from("PROPERTY MANAGER COMPANY")
        .select("*")
        .eq("company_id", company_id)
  
        if (pmIDsError) {
          console.error("Error fetching property manager ids:", pmIDsError.message)
          return
        }
        var propertyManagers = [];
        for (var i = 0; i < pmIDs.length; i++){
          const { data: propertyManager, error:propertyManagerError } = await supabase
          .from("PROPERTY MANAGER")
          .select("*")
          .eq("property_manager_id", pmIDs[i].property_manager_id)
          if (propertyManagerError) {
            console.error("Error fetching property managers:", propertyManagerError.message)
            return;
          }
          else{
            propertyManagers.push(propertyManager[0]);
          }  
        }   
        setPropertyManagers(propertyManagers)
      }
      if (company_id) {
        fetchPropertyManagers()
      }
    }, [])
      return property_managers
    }

export default useGetPropertyManagersByCompanyID