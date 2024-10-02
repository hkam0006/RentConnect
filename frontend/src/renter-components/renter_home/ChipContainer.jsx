import { Paper, Chip } from "@mui/material";

const ChipContainer = ({chips, setChips, onDeleteChip}) => {
  
  const handleDelete = (chipToDelete) => () => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  if (chips.length === 0) return <></>

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'start',
        padding: 1,
        mt: 2,
        boxShadow: 0,
        borderRadius: 5,
        gap: 1,
        flexWrap: "wrap"
      }}
    >
      {chips.map((data) => {
        return (
          <Chip
            key={data}
            label={data}
            size='small'
            onDelete={handleDelete(data)}
          />
        )
      })}
    </Paper>
  )
}

export default ChipContainer