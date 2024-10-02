import { Box, Modal, Grid, Container, Card, CardMedia, CardContent, Typography, Button, Skeleton, Paper, InputBase,Divider, IconButton, Chip, Menu, MenuItem, AppBar, Toolbar, Stack, Dialog, DialogTitle, DialogContent} from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

const SearchPropertyFilter = ({onSearch, value, onChange, handleSubmit}) => {
  return(
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", margin: "auto", borderRadius: 3, minWidth: "300px", mt: 2 }}
    >
      <Box sx={{ p: '10px', display: "flex", alignItems: "center" }}>
        <HouseIcon color='primary' aria-label="menu"/>
      </Box>
      <InputBase  
        sx={{ ml: 1, flex: 1 }} 
        value={value}
        autoFocus
        placeholder="Search region, suburb or postcode" 
        inputProps={{ 'aria-label': 'search suburb' }}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' ){
            ev.preventDefault()
            handleSubmit(ev)
          }
        }}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search" onClick={(e) => handleSubmit(e)}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" >
        <FilterAltIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchPropertyFilter