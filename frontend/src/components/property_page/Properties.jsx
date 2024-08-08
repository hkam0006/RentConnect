import React, { useEffect, useState } from 'react'
import { Container, Paper } from "@mui/material"
import { PropertyStatCards } from './PropertyStatCards';
import { PropertiesTable } from './PropertiesTable';
import { PropertySearch } from './PropertySearch';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import useGetPropetyManagersByCompanyID from '../../queries/Property Manager/useGetPropetyManagersByCompanyID';

import AppLoader from './AppLoader';
import useGetPropertiesByCompanyID from '../../queries/Property/useGetPropertiesByCompanyID';

// this information will be queried from firebase

// DEFAULT COMPANY ID NUMBER
const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78"

export default function Properties() {
  const { fetchProperties } = useGetPropertiesByCompanyID(TEST_COMPANY_ID);
  const propManagers = useGetPropetyManagersByCompanyID(TEST_COMPANY_ID);
  const [properties, setProperties] = useState([]);
  const [unfiltered, setUnfiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const [totalApplications, setTotalApplications] = useState(0);
  const [dom, setDOM] = useState(0);
  const [leased, setLeased] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchProperties()

      setProperties(data);
      setError(error);
      setUnfiltered(data);
      setLoading(false)
    })();
  }, [])

  if (loading) return <AppLoader />

  return (
    <div>
      <NavigationMenu>
        <div style={{ padding: "20px", marginTop: "64px" }}>
          <PropertyStatCards
            totalApplications={totalApplications}
            avgDOM={dom}
            totalLeased={leased}
          />
          <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
            <PropertySearch
              filterProperties={setProperties}
              unfilteredProperties={unfiltered}
              propManagers={propManagers}
              properties={properties}
            />
            <PropertiesTable
              properties={properties}
              handleAddProperties={setProperties}
              propManagers={propManagers}
              setProperties={setProperties}
            />
          </Paper>
        </div>
      </NavigationMenu>
    </div>
  )
}
