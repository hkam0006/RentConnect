import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'

const useGetContactsByID = (id) => {
    const [transformedData, setTransformedData] = useState([])

    useEffect(() => {
        const fetchContacts = async () => {
            // Fetch contacts based on ID
            const { data: contacts, error: contactsError } = await supabase
                .from("CONTACT")
                .select("*")
                .or(`property_manager_id.eq.${id},renter_id.eq.${id}`)

            if (contactsError) {
                console.error("Error fetching contacts:", contactsError.message)
                return
            }

            if (contacts.length === 0) return

            // Extract renter and property manager IDs
            const renterIDs = contacts.map(row => row.renter_id)
            const propertyManagerIDs = contacts.map(row => row.property_manager_id)

            // Fetch renter and property manager data in parallel
            const [renterResponse, pmResponse] = await Promise.all([
                supabase
                    .from('RENTER')
                    .select('*')
                    .in('renter_id', renterIDs),
                supabase
                    .from("PROPERTY MANAGER")
                    .select('*')
                    .in('property_manager_id', propertyManagerIDs)
            ])

            const renterData = renterResponse.data || []
            const PMData = pmResponse.data || []

            if (renterResponse.error) {
                console.error("Error fetching renters:", renterResponse.error.message)
            }
            if (pmResponse.error) {
                console.error("Error fetching property managers:", pmResponse.error.message)
            }

            // Combine renter and property manager data with contacts
            const combinedData = contacts.map(contact => {
                const renterInfo = renterData.find(renter => renter.renter_id === contact.renter_id)
                const propertyManagerInfo = PMData.find(manager => manager.property_manager_id === contact.property_manager_id)

                return {
                    ...contact,
                    renter: renterInfo,
                    propertyManager: propertyManagerInfo,
                }
            })

            // Transform data for UI
            const transformed = combinedData.map(contact => {
                const isCurrentUserPropertyManager = contact.propertyManager?.property_manager_id === id
                
                const otherContact = isCurrentUserPropertyManager ? contact.renter : contact.propertyManager

                return {
                    name: isCurrentUserPropertyManager 
                        ? `${otherContact?.renter_first_name} ${otherContact?.renter_last_name}` 
                        : `${otherContact?.property_manager_first_name} ${otherContact?.property_manager_last_name}`,
                    phone_number: isCurrentUserPropertyManager 
                        ? otherContact?.renter_phone_number 
                        : otherContact?.property_manager_phone_number,
                    email: isCurrentUserPropertyManager 
                        ? otherContact?.renter_email 
                        : otherContact?.property_manager_email?.trim(),
                    last_contact: contact.contact_date,
                    id: isCurrentUserPropertyManager 
                        ? otherContact?.renter_id 
                        : otherContact?.property_manager_id
                }
            })

            setTransformedData(transformed)
        }

        if (id) {
            fetchContacts()
        }
    }, [id])

    return transformedData
}

export default useGetContactsByID
