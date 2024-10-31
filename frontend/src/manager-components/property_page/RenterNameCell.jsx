import React from 'react';
import useGetRenterByRenterID from '../../queries/Renter/useGetRenterByRenterID';
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const RenterNameCell = ({ renterId }) => {
  const { renter, loading, error } = useGetRenterByRenterID(renterId);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading renter</Typography>;

  return <Typography>{renter ? 
    <Link href="#" to={`/Rprofile/${renter[0].renter_id}`} color="inherit" underline="none" style={{ textDecoration: 'none' }}>
      {renter[0]?.renter_first_name} {renter[0]?.renter_last_name}
    </Link>
    :
    <Typography>
      Unknown
    </Typography>}
  </Typography>;
};

export default RenterNameCell;
