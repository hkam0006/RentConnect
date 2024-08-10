import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'

const isValidUUID = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

const useGetPropertyManagerNamesByPropertyManagerIDs = (property_manager_ids, uuidToName) => {
  const [propertyManagerMap, setPropertyManagerMap] = useState({})
  useEffect(() => {
    const fetchPropertyManagers = async () => {
      const idsToFetch = property_manager_ids.filter(id => !uuidToName[id] && isValidUUID(id))
      if (idsToFetch.length === 0) {
        setPropertyManagerMap(uuidToName)
        return
      }

      const { data, error } = await supabase
        .from("PROPERTY MANAGER")
        .select("property_manager_id, property_manager_first_name, property_manager_last_name")
        .in("property_manager_id", idsToFetch)

      if (error) {
        return error
      } else {
        const managerMap = data.reduce((acc, manager) => {
          const fullName = `${manager.property_manager_first_name} ${manager.property_manager_last_name}`
          acc[manager.property_manager_id] = fullName
          return acc
        }, {})

        setPropertyManagerMap({ ...uuidToName, ...managerMap })
      }
    }

    if (property_manager_ids.length > 0 && property_manager_ids[0]) {
      fetchPropertyManagers()
    }
  }, [property_manager_ids, uuidToName])

  return propertyManagerMap
}

export default useGetPropertyManagerNamesByPropertyManagerIDs
