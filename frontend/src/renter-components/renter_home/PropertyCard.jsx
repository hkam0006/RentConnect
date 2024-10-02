const PropertyCard = ({loading, property, showModal}) => {
  const navigate = useNavigate();
  return <>
    {!loading ? <Card sx={{ borderRadius: 0, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={property.property_pictures[0]}
        // alt={property.title}
      />
      <CardContent>
        <Typography variant="subtitle" component="div">
          {fullAddress(property)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.property_type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${property.property_rent} {property.property_rent_frequency}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={showModal}
        >
          View Details
        </Button>
      </CardContent>
    </Card> : <Box sx={{height: "100%"}}>
        <Skeleton animation="wave"  height={200} variant='rectangular' width={"100%"}/>
        <Skeleton animation="wave"  height={50} width={"100%"}/>
        <Skeleton animation="wave"  height={20} width={"50%"}/>
        <Skeleton animation="wave" height={20} width={"20%"}/>
        <Skeleton animation="wave" height={70} width={"100%"}/>
      </Box>
    }
  </>
}

export default PropertyCard