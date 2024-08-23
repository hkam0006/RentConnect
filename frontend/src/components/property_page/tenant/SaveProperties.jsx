import React, { useEffect, useState } from 'react'
import { Container, Paper } from "@mui/material"
import { PropertyStatCards } from './PropertyStatCards';
import { PropertiesTable } from './PropertiesTable';
import { PropertySearch } from './PropertySearch';
import NavigationMenu from '../navigation_menu/NavigationMenus';
import useGetPropetyManagersByCompanyID from '../../queries/Property Manager/useGetPropetyManagersByCompanyID';

import AppLoader from './AppLoader';
import useGetPropertiesByCompanyID from '../../queries/Property/useGetPropertiesByCompanyID';

const SavedProperties = () => {
    const [savedPropertiesData, setSavedPropertiesData] = useState([]);
    useEffect(() => {
        const fetchSavedPropertyData = async () => {
            try{
            const { data: properties, error: propertiesError } = await supabase
              .from("PROPERTY")
              .select("*");
    
            if (propertiesError) {
              throw propertiesError;
            }
            const { data: savedProperties, error: savedPropertiesError } = await supabase
              .from("SAVED PROPERTY")
              .select("*");
    
            if (savedPropertiesError) {
              throw savedPropertiesError;
            }
    
            const mergedSavedProperty = savedProperties.map((savedProperty)=>{
                const property = properties.find((property) => property.property_id === savedProperty.property_id);
                return{
                    ...savedProperty
                };
            });
            setSavedPropertiesData(mergedSavedProperty);
          } catch (error) {
            console.error("Error fetching saved property data:", error);
          }
        };
        fetchSavedPropertyData();
    }, []);
}
export default SavedProperties;