import { supabase } from "../../supabase";
import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus'
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Stack, Button,Chip } from '@mui/material'
import useGetKeyByCompanyID from '../../queries/Key/useGetKeyByCompanyID'
import AddKeyModal from './AddKeyModal'
import useGetPropertiesByCompanyID from '../../queries/Property/useGetPropertiesByCompanyID'
import CheckoutModal from './CheckoutModal'
import useSubscribeKeysByCompanyID from '../../subscribers/Keys/useSubscribeKeysByCompanyID'

const rowHeading = [
  "Status",
  "Key Set",
  "Property Address",
  "Property Manager",
  "Issued",
  "Due",
  "Borrower",
  ""
]

const chipColour = {
  "On Loan": "info",
  "Returned": "primary",
  "Added": "success"
}

const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78"

const Keys = () => {
  const { fetchKeys } = useGetKeyByCompanyID(TEST_COMPANY_ID);
  const { fetchProperties } = useGetPropertiesByCompanyID(TEST_COMPANY_ID);
  const [keys, setKeys] = useState([]);
  const [error, setError] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propManagers, setPropManagers] = useState(["John Smith"]);

  const handleClose = () => setOpenAdd(false);
  const handleOpen = () => setOpenAdd(true);

  const getFullAddress = (property_id) => {
    let address = ""
    properties.map((p) => {
      if (p.property_id === property_id) {
        address = `${p.property_street_number} ${p.property_street_name} ${p.property_street_type}, ${p.property_suburb}, ${p.property_state}`
      }
    })
    return address;
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchKeys();

      setKeys(data)
      setError(error)
    })();

    (async () => {
      const { data, error } = await fetchProperties();

      setProperties(data);
      setError(error);
    })()
  }, [])

  useEffect(() => {

  }, [])

  async function updateRow(keyId) {
    const { data, error } = await supabase
      .from('KEY')
      .update([
        {
          key_status: "Returned",
          key_issued: null,
          key_due: null
        },
      ])
      .eq("key_id", keyId)

    if (error) {
      console.error("Error updating row:", error)
    }
    else {
      console.log('Row updated')
    }
  }

  async function handleCheckIn(id) {
    updateRow(id);
  }

  const handleRealtimeChanges = (payload) => {
    const newKey = payload.new
    const oldKey = payload.old
    const eventType = payload.eventType
    const updatedKeys = [...keys]
    let keyIndex = -1
    if (oldKey){
      keyIndex = updatedKeys.findIndex((key) => (key.key_id === oldKey.key_id) && (key.company_id === oldKey.company_id) && (key.property_id === oldKey.property_id))
    }
    if (eventType === 'DELETE'){
      if (keyIndex != -1){
        updatedKeys.splice(keyIndex, 1)
        setKeys(updatedKeys)
      }
    }
    else if (eventType === 'UPDATE'){
      if (keyIndex != -1){
        updatedKeys[keyIndex] = newKey;
        setKeys(updatedKeys)
      }
    }
    else {
      setKeys((prevKeys) => {
        const updatedKeys = [...prevKeys]
        updatedKeys.push(newKey)
        return updatedKeys
      })
    }
  }

  useSubscribeKeysByCompanyID(TEST_COMPANY_ID, handleRealtimeChanges);

  return (
    <NavigationMenu>
      {openAdd && <AddKeyModal OnClose={handleClose} properties={properties} propManagers={propManagers} />}
      {!!openCheckout && <CheckoutModal onClose={() => setOpenCheckout(null)} checkoutKey={openCheckout} />}
      <Box sx={{ mt: "70px", padding: "20px", width: "100%" }}>
        <Stack direction='row' sx={{ justifyContent: "space-between", padding: "7px", alignItems: "center" }}>
          <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant='h4'>Keys</Typography>
            <TextField variant='standard' placeholder='Search property...' />
          </Stack>
          <Button variant='contained' sx={{ borderRadius: "20px" }} onClick={handleOpen}>Add Key</Button>
        </Stack>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ebeaea" }}>
              <TableRow>
                {rowHeading.map((title, index) => {
                  const alignment = title == "" ? "right" : "left"
                  return (
                    <TableCell align={alignment} key={index}>
                      <Typography variant='subtitle1' fontWeight={700}>{title}</Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {keys.map((key, index) => {
                const buttonTitle = key.key_status === "On Loan" ? "Check In" : "Check Out";
                const buttonVariant = key.key_status === "On Loan" ? "outlined" : "contained";
                const propertyAddress = getFullAddress(key.property_id)
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip variant='filled' label={key.key_status} color={chipColour[key.key_status]} />
                    </TableCell>
                    <TableCell>{key.key_set}</TableCell>
                    <TableCell>{propertyAddress}</TableCell>
                    <TableCell>{"John Smith"}</TableCell>
                    <TableCell>{key.key_status === "On Loan" ? key.key_issued : "N/A"}</TableCell>
                    <TableCell>{key.key_status === "On Loan" ? key.key_due : "N/A"}</TableCell>
                    <TableCell>{key.key_status === "On Loan" ? "Jane Doe" : "N/A"}</TableCell>
                    <TableCell align='right'>
                      {
                        buttonTitle === "Check Out" ? (
                          <Button
                            variant={buttonVariant}
                            style={{ borderWidth: "3px", borderRadius: "20px" }}
                            onClick={() => setOpenCheckout({ key_id: key.key_id, prop_add: propertyAddress, key_set: key.key_set })}
                          >
                            {buttonTitle}
                          </Button>
                        ) : (
                          <Button
                            variant={buttonVariant}
                            style={{ borderWidth: "3px", borderRadius: "20px" }}
                            onClick={() => handleCheckIn(key.key_id)}
                          >
                            {buttonTitle}
                          </Button>
                        )
                      }
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </NavigationMenu >
  )
}

export default Keys
