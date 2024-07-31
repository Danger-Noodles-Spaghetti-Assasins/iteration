import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Graph from './G.Graph.jsx';
// import '../Styling/E.Coin.css';
import { Button, CssBaseline } from "@mui/material";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const Coin = ({ coinId, name, price, symbol, logo, volume, percentChange24H, rank, rating, marketCap, circulatingSupply, totalSupply, low, high }) => {

  const [coinsData, setCoinsData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);

  return (
    <Stack direction="row" spacing={2} useFlexGap="true" justifyContent={"center"} sx={{
      width:"100vw",
      height:"100vh"
    }}>
      <Box sx={{
        display: "flex",
        width: 750,
        my: 4,
        bgcolor: "primary.main",
        px: 2,
        border: '2px solid grey',
        borderRadius: 4,
        overflowY: "scroll"
      }}>
          <Graph coinId={coinId} /> {/* Pass the coinId to the Graph component */}
      </Box>

      <Box sx={{
        alignItems: "left",
        bgcolor: "primary.main",
        height: 750,
        my: 4,
        px: .5,
        border: '2px solid grey',
        borderRadius: 4
        }}>
          <div id="sidebar">
          <h3 id="coinName">{name}</h3>
          <Button variant="contained"> Favorite </Button>
          <h1 id="coinPrice">{`${'$' + price.toLocaleString('en-US')}`}</h1>
          <p className="coinDetail">Rank: {rank}</p>
          <p className="coinDetail">Rating: {rating}</p>
          <p className="coinDetail">Market Cap: {marketCap}</p>
          <p className="coinDetail">24H Volume: {volume}</p>
          <p className="coinDetail">Circulating Supply: {circulatingSupply}</p>
          <p className="coinDetail">Total Supply: {totalSupply}</p>
          <p className="coinDetail">24H Low: {low}</p>
          <p className="coinDetail">24H High: {high}</p>
          <div id="newsCard">
            <img id="newsImage" src="https://via.placeholder.com/50" alt="news" />
            <div id="newsText">
                <div><b>Bitcoin Soars</b></div>
                <div>Yahoo Finance</div>
                <div>Kim Smith - July 11, 2024</div>
              </div>
          </div>
          </div>
      </Box>
    </Stack>
  );
};


export default Coin;