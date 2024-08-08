import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const useGetApplicationCountPerProperty = (company_id) => {
  const [applicationCount, setApplicationCount] = useState();

  useEffect(() => {
    const fetchApplications = async () => {
      if (company_id){
        const {data, error} = await supabase
          .from("APPLICATION")
          .select("")
      }
    }
  }, [company_id])
}

const getApplicationsPerProperty = async () => {
  const { data, error } = await supabase
    .from('applications')
    .select('property_id, count:property_id', { count: 'exact' })
    .group('property_id')

  if (error) {
    console.error('Error fetching applications per property:', error);
  } else {
    console.log('Applications per property:', data);
  }
};

getApplicationsPerProperty();
