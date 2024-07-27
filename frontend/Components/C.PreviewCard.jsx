import React, { useState } from 'react';
import styled from 'styled-components';
// import '../Styling/C.PreviewCard.css';
import {Box, Typography, Avatar} from "@mui/material";

const PreviewCard = ({ name, price, symbol, logo, rank }) => { // Added onClick prop
  const [checked, setChecked] = useState(false);

  const handleSelect = (event) => {
    event.stopPropagation(); //allows click on select btn w/o triggering whole card click
    setChecked(!checked);
  };

  return (
    <Box height={200} width={400} display="flex" alignItems="center" gap={4} my={4} p={2} 
      sx={{width: 400, height: 200, borderRadius: 1,
        bgcolor: 'primary.main',
        '&:hover': {
          bgcolor: 'primary.dark',
        }
      }}>
      <div id="header">
        {/* <CheckBoxStyle type="checkbox" checked={checked} onChange={handleSelect} />
        <CompareText>Compare</CompareText> */}
      </div>
      <h3>{name}</h3>
      <Avatar className="logo" src={logo} alt={`${name} logo`} sx={{ height: 75, width: 75,mt: 5, mb: 20 }} />
      <div id="footer">
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