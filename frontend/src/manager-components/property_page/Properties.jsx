import React, { useEffect, useState } from 'react'
import { Container, Paper } from "@mui/material"
import { PropertyStatCards } from './PropertyStatCards';
import { PropertiesTable } from './PropertiesTable';
import { PropertySearch } from './PropertySearch';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import useGetPropertyManagersByCompanyID from '../../queries/Property Manager/useGetPropertyManagersByCompanyID';

import AppLoader from './AppLoader';
import { useSelector } from 'react-redux';
import uesGetPropertiesWithApplicationByCompanyId from '../../queries/Property/useGetPropertiesWithApplicationByCompanyId';

const getDOM = (listing_date) => {
  return Math.round((new Date() - new Date(listing_date)) / (1000 * 3600 * 24))
}

export default function Properties() {
  const company_id = useSelector((state) => state.user.currentUser.company_id)
  const { fetchProperties } = uesGetPropertiesWithApplicationByCompanyId(company_id);
  const propManagers = useGetPropertyManagersByCompanyID(company_id);
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

  if (loading) return (
    <NavigationMenu>
      <AppLoader />
    </NavigationMenu>
  )

  return (
    <div>
      <NavigationMenu>
        <div style={{ padding: "20px", marginTop: "64px" }}>
          <PropertyStatCards
            company_id={company_id}
            totalApplications={properties.reduce((total, curr) => total += curr.APPLICATION.length, 0)}
            avgDOM={properties.reduce((total, curr) => total += getDOM(curr.property_listing_date), 0) / properties.length}
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
