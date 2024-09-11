import React from 'react';
import useGetRenterByRenterID from '../../queries/Renter/useGetRenterByRenterID';
import { Typography } from "@mui/material";

const RenterNameCell = ({ renterId }) => {
  const { renter, loading, error } = useGetRenterByRenterID(renterId);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading renter</Typography>;

  return <Typography>{renter ? renter[0].renter_first_name + " " + renter[0].renter_last_name : 'Unknown'}</Typography>;
};

export default RenterNameCell;
