import { supabase } from "../../supabase";
import Fuse from 'fuse.js'
import React, { useEffect, useState } from 'react'
import NavigationMenu from '../navigation_menu/NavigationMenus'
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Stack, Button,Chip, Checkbox } from '@mui/material'
import useGetKeyByCompanyID from '../../queries/Key/useGetKeyByCompanyID'
import AddKeyModal from './AddKeyModal'
import useGetPropertiesByCompanyID from '../../queries/Property/useGetPropertiesByCompanyID'
import CheckoutModal from './CheckoutModal'
import useSubscribeKeysByCompanyID from '../../subscribers/Keys/useSubscribeKeysByCompanyID'
import useDeleteMultipleKeys from "../../mutators/Keys/useDeleteMultipleKeys";
import useUpdateKeyStatus from "../../mutators/Keys/useUpdateKeyStatus"

const rowHeading = [
  "",
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
  const deleteKeys = useDeleteMultipleKeys();
  const {checkInKey} = useUpdateKeyStatus();
  const [keys, setKeys] = useState([]);
  const [error, setError] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propManagers, setPropManagers] = useState(["John Smith"]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('')

  const handleClose = () => setOpenAdd(false);
  const handleOpen = () => setOpenAdd(true);

  const options = {
    includeScore: false,
    keys: ['full_address']
  }

  const fuse = new Fuse(properties, options)

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
      const { data, error } = await fetchProperties();

      setProperties(data);
      setError(error);
    })();

    (async () => {
      const { data, error } = await fetchKeys();

      data.map((key) => key.full_address = getFullAddress(key.property_id))
      setKeys(data)
      setError(error)
    })();
  }, [])

  const handleSelectRow = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } 
    else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } 
    else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } 
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  async function handleCheckIn(id) {
    checkInKey(id);
  }

  const handleDeleteMultipleRows = () => {
    deleteKeys(selected);
    setSelected([])
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
        const oldKeyArr = [...prevKeys]
        oldKeyArr.push(newKey)
        return oldKeyArr
      })
    }
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useSubscribeKeysByCompanyID(TEST_COMPANY_ID, handleRealtimeChanges);

  return (
    <NavigationMenu>
      {openAdd && <AddKeyModal OnClose={handleClose} properties={properties} propManagers={propManagers} />}
      {!!openCheckout && <CheckoutModal onClose={() => setOpenCheckout(null)} keyId={openCheckout} />}
      <Box sx={{ mt: "70px", padding: "20px", width: "100%" }}>
        <Stack direction='row' sx={{ justifyContent: "space-between", padding: "7px", alignItems: "center" }}>
          <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant='h4' >Keys</Typography>
            <TextField variant='standard' placeholder='Search property...' value={search} onChange={(e) => setSearch(e.target.value)}/>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Button 
              variant='contained' 
              color="error" 
              disabled={selected.length === 0} 
              onClick={() => handleDeleteMultipleRows()}
            >
              Delete {selected.length} Key(s)
            </Button>
            <Button variant='contained'  onClick={handleOpen}>Add Key</Button>
          </Stack>
        </Stack>
        <TableContainer sx={{ mt: 2 }}>
          <Table sx={{minWidth: "600px"}}>
            <TableHead sx={{ backgroundColor: "#ebeaea" }}>
              <TableRow>
                {rowHeading.map((title, index) => {
                  return (
                    <>
                    <TableCell align="left" key={index}>
                      <Typography variant='subtitle1' fontWeight={700}>{title}</Typography>
                    </TableCell>
                    </>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {keys.map((key, index) => {
                const buttonTitle = key.key_status === "On Loan" ? "Check In" : "Check Out";
                const buttonVariant = key.key_status === "On Loan" ? "outlined" : "contained";
                const propertyAddress = getFullAddress(key.property_id)
                const isKeySelected = isSelected(key.key_id)
                return (
                  <TableRow 
                    hover
                    key={key.key_id}  
                    selected={isKeySelected}
                  >
                    <TableCell>
                      <Checkbox 
                        checked={isKeySelected}
                        onClick={(e) => handleSelectRow(e, key.key_id)}
                      />
                    </TableCell>
                    <TableCell onClick={(e) => handleSelectRow(e, key.key_id)} sx={{cursor: "pointer"}}>
                      <Chip variant='filled' label={key.key_status} color={chipColour[key.key_status]} />
                    </TableCell>
                    <TableCell onClick={(e) => handleSelectRow(e, key.key_id)} sx={{cursor: "pointer"}}>{key.key_set}</TableCell>
                    <TableCell onClick={(e) => handleSelectRow(e, key.key_id)} sx={{cursor: "pointer"}}>{propertyAddress}</TableCell>
                    <TableCell onClick={(e) => handleSelectRow(e, key.key_id)} sx={{cursor: "pointer"}}>{"John Smith"}</TableCell>
                    <TableCell onClick={(e) => handleSelectRow(e, key.key_id)} sx={{cursor: "pointer"}}>{key.key_status === "On Loan" ? key.key_issued : "N/A"}</TableCell>
                    <TableCell onClick={(e) => handleSelectRow(e, key.key_id)} sx={{cursor: "pointer"}}>{key.key_status === "On Loan" ? key.key_due : "N/A"}</TableCell>
                    <TableCell onClick={(e) => handleSelectRow(e, key.key_id)} sx={{cursor: "pointer"}}>{key.key_status === "On Loan" ? "Jane Doe" : "N/A"}</TableCell>
                    <TableCell align='left'>
                      {
                        buttonTitle === "Check Out" ? (
                          <Button
                            variant={buttonVariant}
                            style={{ borderWidth: "3px" }}
                            sx={{width: "100%"}}
                            onClick={() => setOpenCheckout({ key_id: key.key_id, prop_add: propertyAddress, key_set: key.key_set })}
                          >
                            {buttonTitle}
                          </Button>
                        ) : (
                          <Button
                            variant={buttonVariant}
                            style={{ borderWidth: "3px" }}
                            sx={{width: "100%"}}
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
