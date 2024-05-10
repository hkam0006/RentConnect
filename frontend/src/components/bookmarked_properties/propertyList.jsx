import React, { useEffect, useState } from 'react'
import { Container, Paper } from "@mui/material"
import { PropertiesTable } from '../property_page/PropertiesTable';
import { PropertiesListItems } from './propertyListItems';
import NavigationMenu from '../navigation_menu/NavigationMenus';

// Demo Images
import ListingImage from '../property_page/listing.jpg'
import ListingImageApt from '../property_page/listing2.jpg'
import useApp from '../../hooks/useApp';
import AppLoader from '../property_page/AppLoader';

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

export default function PropertyList() {
  const { fetchProperties } = useApp();
  const [properties, setProperties] = useState([]);
  const [unfiltered, setUnfiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalApplications, setTotalApplications] = useState(0);
  const [dom, setDOM] = useState(0);
  const [leased, setLeased] = useState(0);

  useEffect(() => {
    let unsub = null;
    fetchProperties(
      "testID",
      setLoading,
      setProperties,
      setUnfiltered,
      setDOM,
      setLeased,
      setTotalApplications
    ).then((res) => {
      unsub = res;
    })

    return () => {
      if (unsub) {
        unsub()
      }
    }
  }, [])

  if (loading) return <AppLoader />

  return (
    <div>
      <NavigationMenu>
      <div style={{ padding: "20px", marginTop: "64px" }}>
        <Paper sx={{ mt: 2, borderRadius: 3 }} elevation={3}>
          <PropertiesListItems
            properties={properties}
          />
        </Paper>
        
      </div>
      </NavigationMenu>
    </div>
    
  )
}
