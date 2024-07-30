import React, { useState } from 'react';
// import '../Styling/C.PreviewCard.css';
import {Box, Typography, Avatar} from "@mui/material";

const PreviewCard = ({ name, price, symbol, logo, rank }) => { // Added onClick prop
  const [checked, setChecked] = useState(false);

  const handleSelect = (event) => {
    event.stopPropagation(); //allows click on select btn w/o triggering whole card click
    setChecked(!checked);
  };

  return (
    <Box
      sx={{borderRadius: 1,
        bgcolor: 'primary.main',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
        p: 2
      }}>
      <Typography variant='h5' color={"primary.contrastText"}>{name}</Typography>
      <div><Avatar className="logo" src={logo} alt={`${name} logo`} sx={{ height: '50%', width: '50%', mt: 5, mb: 20 }} /></div>
      <div>
        <Typography align='center' sx={{mx:2, verticalAlign: 'middle'}}>
          <Typography color='text.primary'>
            Active Price: ${Number(price.toFixed(2)).toLocaleString('en-US')}
          </Typography> 
          <Typography color='text.secondary'>
            <b>Rank:</b> #{rank}
          </Typography>
        </Typography>
      </div>
    </Box>
  );
};

export default PreviewCard;
