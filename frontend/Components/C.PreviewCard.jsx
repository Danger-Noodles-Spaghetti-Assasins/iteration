import React, { useState } from 'react';
// import '../Styling/C.PreviewCard.css';
import {Grid, Typography, Avatar} from "@mui/material";

const PreviewCard = ({ name, price, symbol, logo, rank }) => { // Added onClick prop
  const [checked, setChecked] = useState(false);

  const handleSelect = (event) => {
    event.stopPropagation(); //allows click on select btn w/o triggering whole card click
    setChecked(!checked);
  };

  return (
    <Grid
      container
      sx={{borderRadius: 1,
        bgcolor: 'primary.main',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
        p: 2
      }}>
      <Grid item xs='12'><Typography variant='h5' color={"primary.contrastText"} mt={2} sx={{textAlign:'center'}}>{name}</Typography></Grid>
      <Grid item xs='12'><Avatar className="logo" src={logo} alt={`${name} logo`} sx={{height: 'auto', width:'auto', m:'20%', }}/></Grid>
      <Grid item xs='12'>
        <Typography align='center' sx={{mx:2, verticalAlign: 'middle'}}>
          <Typography xs='6' color='text.primary'>
            Active Price: ${Number(price.toFixed(2)).toLocaleString('en-US')}
          </Typography> 
          <Typography xs='6' mb={'10%'} color='text.secondary'>
            <b>Rank:</b> #{rank}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PreviewCard;
