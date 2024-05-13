import React, { useEffect, useState } from 'react'
import { Container, Paper } from "@mui/material"
import { PropertyStatCards } from './PropertyStatCards';
import { PropertiesTable } from './PropertiesTable';
import { PropertySearch } from './PropertySearch';
import NavigationMenu from '../navigation_menu/NavigationMenus';

// Demo Images
import ListingImage from './listing.jpg'
import ListingImageApt from './listing2.jpg'
import useApp from '../../hooks/useApp';
import AppLoader from './AppLoader';
import { supabase } from '../../supabase';

function createData(id, address, vacancy, attendees, applications, listingImage, type, price, available, bedrooms, bathrooms, car_spaces, propManager) {
  return { id, address, vacancy, attendees, applications, listingImage, type, price, available, bedrooms, bathrooms, car_spaces, propManager };
}

const defaultRows = [
  createData(crypto.randomUUID(), '1702/655 Chapel Street, South Yarra 3141', 25, 31, 15, ListingImageApt, "Apartment", "750 per week", "31st March 2024", 3, 3, 2, "Jensen Huang"),
  createData(crypto.randomUUID(), '123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "800 per week", "31st Feb 2024", 3, 2, 1, "Jensen Huang"),
  createData(crypto.randomUUID(), '123 Fake Street, Melbourne 3000', 30, 10, 13, ListingImage, "House", "800 per week", "31st Feb 2024", 1, 1, 0, "Elon Musk"),
];

// this information will be queried from firebase
const propManagers = [
  "Jensen Huang",
  "Mark Zuckerberg",
  "Elon Musk"
]

// DEFAULT COMPANY ID NUMBER

const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78"

export default function Properties() {
  const { fetchProperties } = useApp();
  const [properties, setProperties] = useState([]);
  const [unfiltered, setUnfiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const [totalApplications, setTotalApplications] = useState(0);
  const [dom, setDOM] = useState(0);
  const [leased, setLeased] = useState(0);

  const getPropertyData = async () => {
    const { data, error } = await supabase
      .from("PROPERTY")
      .select("*")
      .eq("company_id", TEST_COMPANY_ID)

    setProperties(data);
    setError(data);
    setUnfiltered(data);
    setLoading(false)
  }

  useEffect(() => {
    getPropertyData()
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
