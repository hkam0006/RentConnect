import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'

const isValidUUID = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

const useGetRenterNamesByRenterIDs = (renter_ids, uuidToName) => {
  const [renterMap, setRenterMap] = useState({})
  useEffect(() => {
    const fetchRenters = async () => {
      const idsToFetch = renter_ids.filter(id => !uuidToName[id] && isValidUUID(id))
      if (idsToFetch.length === 0) {
        setRenterMap(uuidToName)
        return
      }

      const { data, error } = await supabase
        .from("RENTER")
        .select("renter_id, renter_first_name, renter_last_name")
        .in("renter_id", idsToFetch)

      if (error) {
        return error
      } else {
        const renterMap = data.reduce((acc, renter) => {
          const fullName = `${renter.renter_first_name} ${renter.renter_last_name}`
          acc[renter.renter_id] = fullName
          return acc
        }, {})
        setRenterMap({ ...uuidToName, ...renterMap })
      }
    }

    if (renter_ids.length > 0 && renter_ids[0]) {
      fetchRenters()
    }
  }, [renter_ids, uuidToName])

  return renterMap
}

export default useGetRenterNamesByRenterIDs
