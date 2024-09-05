import { supabase } from "../../supabase";
import { v4 as uuidv4 } from 'uuid';

const useAddProperty = () => {
  const addProperty = async (companyID, propertyID = uuidv4(), propertyStreetNumber, propertyStreetName, propertyStreetType, propertySuburb, propertyState, propertyBedroomsCount,
    propertyBathroomCount, propertyCarSpotCount, propertyType, propertyRent, propertyFootprint, propertyDescription, propertyAmenities, propertyPictures, propertyRentFrequency,
    propertyManagerID, propertyApplied, propertyListingDate, propertyAttendees, propertyLeaseStart, propertyUnitNumber, propertyPostcode ) => {
    try {
      // Upload property images in to images bucket
      const uploadedPhotoUrls = [];

      for (const file of propertyPictures) {
        const { data, error: uploadError } = await supabase.storage
          .from('property_images')
          .upload(`properties/${propertyID}/${file.name}`, file)
        

        if (uploadError) throw uploadError;

        // Get the public URL of the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from('property_images')
          .getPublicUrl(`properties/${propertyID}/${file.name}`);
      
        console.log(publicUrlData);
        uploadedPhotoUrls.push(publicUrlData.publicUrl);

      }
      

        const { data, error } = await supabase
            .from("PROPERTY")
            .insert([{
                company_id: companyID, property_id: propertyID,
                property_street_number: propertyStreetNumber,
                property_street_name: propertyStreetName,
                property_street_type: propertyStreetType,
                property_suburb: propertySuburb,
                property_state: propertyState,
                property_bedroom_count: propertyBedroomsCount,
                property_bathroom_count: propertyBathroomCount,
                property_car_spot_count: propertyCarSpotCount,
                property_type: propertyType,
                property_rent: propertyRent,
                property_footprint: propertyFootprint,
                property_description: propertyDescription,
                property_amenities: propertyAmenities,
                property_pictures: uploadedPhotoUrls,
                property_rent_frequency: propertyRentFrequency,
                property_manager_id: propertyManagerID,
                property_applied: propertyApplied,
                property_listing_date: propertyListingDate,
                property_attendees: propertyAttendees,
                property_lease_start: propertyLeaseStart,
                property_unit_number: propertyUnitNumber,
                property_postcode: propertyPostcode
              }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return { addProperty };
}

export default useAddProperty
