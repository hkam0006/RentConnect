import React, { useEffect, useState } from "react";
import NavigationMenu from "../navigation_menu/NavigationMenus";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  Stack,
  Button,
  Chip,
  Checkbox,
} from "@mui/material";
import useGetKeyByCompanyID from "../../queries/Key/useGetKeyByCompanyID";
import AddKeyModal from "./AddKeyModal";
import useGetPropertiesByCompanyID from "../../queries/Property/useGetPropertiesByCompanyID";
import CheckoutModal from "./CheckoutModal";
import useSubscribeKeysByCompanyID from "../../subscribers/Keys/useSubscribeKeysByCompanyID";
import useDeleteMultipleKeys from "../../mutators/Keys/useDeleteMultipleKeys";
import useUpdateKeyStatus from "../../mutators/Keys/useUpdateKeyStatus";
import AppLoader from "../property_page/AppLoader";
import useGetPropetyManagersByCompanyID from "../../queries/Property Manager/useGetPropetyManagersByCompanyID";

const rowHeading = [
  "",
  "Status",
  "Key Set",
  "Property Address",
  "Property Manager",
  "Issued",
  "Due",
  "Borrower",
  "",
];

const chipColour = {
  "On Loan": "info",
  Returned: "primary",
  Added: "success",
};

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78";

const Keys = () => {
  const { fetchKeys } = useGetKeyByCompanyID(TEST_COMPANY_ID);
  const { fetchProperties } = useGetPropertiesByCompanyID(TEST_COMPANY_ID);
  const propManagers = useGetPropetyManagersByCompanyID(TEST_COMPANY_ID);
  const deleteKeys = useDeleteMultipleKeys();
  const { checkInKey } = useUpdateKeyStatus();
  const [keys, setKeys] = useState([]);
  const [error, setError] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredKeys, setFilteredKeys] = useState([]);

  const handleClose = () => setOpenAdd(false);
  const handleOpen = () => setOpenAdd(true);

  const propManagerMap = {}
  for (let i = 0; i < propManagers.length; i++){
    const curr = propManagers[i];
    propManagerMap[curr.property_manager_id] = `${curr.property_manager_first_name} ${curr.property_manager_last_name}`
  }

  const fullAddressMap = {}
  for (let i = 0; i < properties.length; i++){
    const curr = properties[i];
    fullAddressMap[curr.property_id] = `${curr.property_street_number} ${curr.property_street_name} ${curr.property_street_type}, ${curr.property_suburb}, ${curr.property_state}`;
  }

  const options = {
    includeScore: false,
    keys: ["full_address"],
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchProperties();

      setProperties(data);
      setError(error);
    })();

    (async () => {
      const { data, error } = await fetchKeys();

      data.map((key) => (key.full_address = fullAddressMap[key.property_id]));
      setKeys(data);
      setFilteredKeys(data);
      setError(error);
    })();

    setLoading(false);
  }, []);

  const handleSelectRow = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  async function handleCheckIn(id) {
    checkInKey(id);
  }

  const handleDeleteMultipleRows = () => {
    deleteKeys(selected);
    setSelected([]);
  };

  const handleKeyChanges = (payload) => {
    const newKey = payload.new;
    const oldKey = payload.old;
    const eventType = payload.eventType;
    const updatedKeys = [...keys];
    let keyIndex = -1;
    if (oldKey) {
      keyIndex = updatedKeys.findIndex(
        (key) =>
          key.key_id === oldKey.key_id &&
          key.company_id === oldKey.company_id &&
          key.property_id === oldKey.property_id
      );
    }
    if (eventType === "DELETE") {
      if (keyIndex != -1) {
        updatedKeys.splice(keyIndex, 1);
        setKeys(updatedKeys);
        setFilteredKeys(updatedKeys);
      }
    } else if (eventType === "UPDATE") {
      if (keyIndex != -1) {
        updatedKeys[keyIndex] = newKey;
        setKeys(updatedKeys);
        setFilteredKeys(updatedKeys);
      }
    } else {
      setKeys((prevKeys) => {
        const oldKeyArr = [...prevKeys];
        oldKeyArr.push(newKey);
        return oldKeyArr;
      });
      setFilteredKeys((prevKeys) => {
        const oldKeyArr = [...prevKeys];
        oldKeyArr.push(newKey);
        return oldKeyArr;
      });
    }
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value
    setSearch(searchQuery)
    setFilteredKeys(keys)
    if (searchQuery.length === 0 ){
      setFilteredKeys(keys);
    }
    else{
      const newArr = [...keys]
      const arr = newArr.filter((key) => matchSearchQuery(key, searchQuery.toLowerCase()))
      setFilteredKeys(arr);
    }
  }
  
  const matchSearchQuery = (key, search) => {
    return fullAddressMap[key.property_id].toLowerCase().includes(search) || key.key_set.toLowerCase().includes(search) ;
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;
  useSubscribeKeysByCompanyID(TEST_COMPANY_ID, handleKeyChanges);

  if (loading) return <AppLoader />;

  return (
    <NavigationMenu>
      {openAdd && (
        <AddKeyModal
          OnClose={handleClose}
          properties={properties}
          propManagers={propManagers}
        />
      )}
      {!!openCheckout && (
        <CheckoutModal
          onClose={() => setOpenCheckout(null)}
          keyObject={openCheckout}
        />
      )}
      <Box sx={{ mt: "70px", padding: "20px", width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            padding: "7px",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant="h4">Keys</Typography>
            <TextField
              variant="standard"
              placeholder="Search property..."
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="error"
              disabled={selected.length === 0}
              onClick={() => handleDeleteMultipleRows()}
            >
              Delete {selected.length} Key(s)
            </Button>
            <Button variant="contained" onClick={handleOpen}>
              Add Key
            </Button>
          </Stack>
        </Stack>
        <TableContainer sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ backgroundColor: "#ebeaea" }}>
              <TableRow>
                {rowHeading.map((title, index) => {
                  return (
                    <TableCell align="left" key={index}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {title}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredKeys.map((key, index) => {
                const buttonTitle =
                  key.key_status === "On Loan" ? "Check In" : "Check Out";
                const buttonVariant =
                  key.key_status === "On Loan" ? "outlined" : "contained";
                const propertyAddress = fullAddressMap[key.property_id];
                const isKeySelected = isSelected(key.key_id);
                return (
                  <TableRow hover key={key.key_id} selected={isKeySelected}>
                    <TableCell>
                      <Checkbox
                        checked={isKeySelected}
                        onClick={(e) => handleSelectRow(e, key.key_id)}
                      />
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectRow(e, key.key_id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Chip
                        variant="filled"
                        label={key.key_status}
                        color={chipColour[key.key_status]}
                      />
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectRow(e, key.key_id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {key.key_set}
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectRow(e, key.key_id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {propertyAddress}
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectRow(e, key.key_id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {propManagerMap[key.property_manager_id]}
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectRow(e, key.key_id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {key.key_status === "On Loan" ? new Date(key.key_issued).toLocaleDateString("en-us", dateOptions) : "N/A"}
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectRow(e, key.key_id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {key.key_status === "On Loan" ? new Date(key.key_due).toLocaleDateString("en-us", dateOptions) : "N/A"}
                    </TableCell>
                    <TableCell
                      onClick={(e) => handleSelectRow(e, key.key_id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {key.key_status === "On Loan" ? key.borrower_name : "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {buttonTitle === "Check Out" ? (
                        <Button
                          variant={buttonVariant}
                          style={{ borderWidth: "3px" }}
                          sx={{ width: "100%" }}
                          onClick={() =>
                            setOpenCheckout({
                              key_id: key.key_id,
                              prop_add: propertyAddress,
                              key_set: key.key_set,
                              manager_name: propManagerMap[key.property_manager_id],
                              key_set: key.key_set
                            })
                          }
                        >
                          {buttonTitle}
                        </Button>
                      ) : (
                        <Button
                          variant={buttonVariant}
                          style={{ borderWidth: "3px" }}
                          sx={{ width: "100%" }}
                          onClick={() => handleCheckIn(key.key_id)}
                        >
                          {buttonTitle}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </NavigationMenu>
  );
};

export default Keys;
