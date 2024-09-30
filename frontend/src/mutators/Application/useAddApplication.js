import { supabase } from "../../supabase";
import dayjs from "dayjs";

const useAddApplication = () => {
  const addApplication = async (renterID, propertyID, companyID, applicationRentPreference, applicationTerm, applicationLeaseStart, 
    applicationAdultsNumber, applicationChildrenNumber, applicationPetsNumber, applicationStatus, preferencesVerified,
    addressHistoryVerified, employmentHistoryVerified, incomeVerified, identityVerified, petsVerified, applicationDetails) => {
    try {
        const { data, error } = await supabase
            .from("APPLICATION")
            .insert([{
                renter_id: renterID, property_id: propertyID, company_id: companyID,
                application_rent_preference: applicationRentPreference,
                application_term: applicationTerm,
                application_lease_start: applicationLeaseStart,
                application_adults_number: applicationAdultsNumber,
                application_children_number: applicationChildrenNumber,
                application_pets_number: applicationPetsNumber,
                application_status: applicationStatus,
                preferences_verified: preferencesVerified,
                address_history_verified: addressHistoryVerified,
                employment_history_verified: employmentHistoryVerified,
                income_verified: incomeVerified,
                identity_verified: identityVerified,
                pets_verified: petsVerified,
                application_details: applicationDetails,
                application_apply_date: dayjs()
              }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return {addApplication};
}

export default useAddApplication
