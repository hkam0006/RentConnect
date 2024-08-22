import { supabase } from "../../supabase";

const useAddProperty = () => {
  const addProperty = async (companyID, propertyID, propertyStreetNumber, propertyStreetName, propertyStreetType, propertySuburb, propertyState, propertyBedroomsCount,
    propertyBathroomCount, propertyCarSpotCount, propertyType, propertyRent, propertyFootprint, propertyDescription, propertyAmenities, propertyPictures, propertyRentFrequency,
    propertyManagerID, propertyApplied, propertyListingDate, propertyAttendees, propertyLeaseStart, propertyUnitNumber ) => {
    try {
        const { data, error } = await supabase
            .from("PROPERTY")
            .insert([{
                company_id: companyID, property_id: propertyID,
                street_number: propertyStreetNumber,
                street_name: propertyStreetName,
                street_type: propertyStreetType,
                suburb: propertySuburb,
                state: propertyState,
                bedroom_count: propertyBedroomsCount,
                bathroom_count: propertyBathroomCount,
                car_spot_count: propertyCarSpotCount,
                type: propertyType,
                rent: propertyRent,
                footprint: propertyFootprint,
                description: propertyDescription,
                amenities: propertyAmenities,
                pictures: propertyPictures,
                rent_frequency: propertyRentFrequency,
                manager_id: propertyManagerID,
                applied: propertyApplied,
                listing_date: propertyListingDate,
                attendees: propertyAttendees,
                lease_start: propertyLeaseStart,
                unit_number: propertyUnitNumber
              }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return addProperty;
}

export default useAddProperty
