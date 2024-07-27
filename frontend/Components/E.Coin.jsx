import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Graph from './G.Graph.jsx';
import '../Styling/E.Coin.css';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';


const Coin = ({ coinId, name, price, symbol, logo, volume, percentChange24H, rank, rating, marketCap, circulatingSupply, totalSupply, low, high }) => {

  const [coinsData, setCoinsData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);

  return (
    <Box sx={{
      bgcolor: "primary.main"
    }}>
      <section id="graphContainer">
        <Graph coinId={coinId} /> {/* Pass the coinId to the Graph component */}
      </section>
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
  );
};


export default Coin;