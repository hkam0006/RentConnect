import { supabase } from "../../supabase";

const useAddApplication = () => {
  const addApplication = async (renterID, propertyID, companyID, applicationRentPreference, applicationTerm, applicationLeaseStart, 
    applicationAdultsNumber, applicationChildrenNumber, applicationPetsNumber, applicationCurrentIncome, applicationStatus, preferencesVerified, 
    addressHistoryVerified, employmentHistoryVerified, incomeVerified, identityVerified, petsVerified, applicationDetails) => {
    try {
        const { data, error } = await supabase
            .from("APPLICATION")
            .insert([{
                renter_id: renterID, property_id: propertyID, company_id: companyID,
                rent_preference: applicationRentPreference,
                term: applicationTerm,
                lease_start: applicationLeaseStart,
                adults_number: applicationAdultsNumber,
                children_number: applicationChildrenNumber,
                pets_number: applicationPetsNumber,
                current_income: applicationCurrentIncome,
                status: applicationStatus,
                preferences_verified: preferencesVerified,
                address_history_verified: addressHistoryVerified,
                employment_history_verified: employmentHistoryVerified,
                income_verified: incomeVerified,
                identity_verified: identityVerified,
                pets_verified: petsVerified,
                details: applicationDetails
              }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return addApplication;
}

export default useAddApplication
