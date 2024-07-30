import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import PreviewCard from './C.PreviewCard';
import { Autocomplete, TextField, Grid, Box, Link } from "@mui/material";

// import Select from 'react-select';
// import '../Styling/B.Homepage.css';

const handleClick = (name) => {
  console.log(`clicked ${name}`)
  // We can't fully build this out yet
};

const HomePage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/coins', {
          method: "GET"
        });
        if (response.ok) {
          const data = await response.json();
          console.log("data: ", data)
          const newArr = data.coinList.data.items;
          setCryptoData(newArr);
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(error)
    console.log(JSON.stringify(error));

  useEffect(() => {
    let options = cryptoData.map(function (coin) {
      return { value: coin.name, label: coin.name };
    })
    setFilteredData(options);
  }, [searchTerm, cryptoData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // const handleSelectChange = (selectedOption) => {
    //     navigate(`/coin/${selectedOption.value}`);
    // };


    return (
        <div id="container">
            <Box sx={{ flexGrow: 1, mx:10}}>
              <Grid container spacing={4}>
                {cryptoData.map((crypto, index) => (
                    <Grid item xs={12} md={6} lg={4} justifyContent='center'>
                        <Link key={index} href={`/coinpage/${crypto.id}`} underline="none">
                            <PreviewCard
                            name={crypto.name}
                            price={crypto.price}
                            logo={crypto.logo}
                            rank={index + 1}
                            symbol={crypto.symbol}
                            />
                        </Link>
                    </Grid>
                ))}
              </Grid>
            {/* needed separate div to format width of Select */}
            </Box>
        </div>
    );
};

export default HomePage;
