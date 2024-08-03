import React, { useEffect, useState } from 'react';
import Coin from './E.Coin';
import { useParams } from 'react-router-dom';
import { Grid } from "@mui/material";
// import '../Styling/D.CoinPage.css';

const CoinPage = () => {
    const { coinId } = useParams(); // Extract coinId from URL
    const [cryptoData, setCryptoData] = useState([]);
    const [moreCryptoData, setMoreCryptoData] = useState([]);  // lint taming. uncomment if you're going to use it
    const [error, setError] = useState(null);


    // const coinId = props.coinId;
    // const coinId = 'ethereum'; // for testing purposes


    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(`Fetching data for coinId: ${coinId}`);
            const response = await fetch(`/api/completeCoin/${coinId}`, {
              method: "GET"
            });
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            const newArr = data.data;
            console.log('Fetched data:', newArr);
            setCryptoData(newArr);
            console.log("trying to access Market_data: ", newArr.market_data)
          } catch (error) {
            console.error("Fetch Error:", error);
            setError(error.message);
          }
        };
   
        fetchData();
      }, [coinId]);

      function formatHighNum(num) {
        const trillion = 1_000_000_000_000;
        const billion = 1_000_000_000;
        const million = 1_000_000;

        if (num >= trillion) {
          return `${(num / trillion).toFixed(2)}T`; 
        } else if (num >= billion) {
          return `${(num / billion).toFixed(2)}B`;
        } else if (num >= million) {
          return `${(num / million).toFixed(2)}M`;
        } else {
          return `$${Number(num).toLocaleString('en-US')}`;
        }
      };


    // useEffect(() => {
    //     const fetchMoreData = async () => {
    //         try {
    //             const response = await fetch('/api/ratings', {
    //                 method: "GET"
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 const moreDataArr = data.data.items;
    //                 setMoreCryptoData(moreDataArr);
    //             } else {
    //                 throw new Error(`Error: ${response.status}`);
    //             }
    //         } catch (error) {
    //             // console.error("Fetch Error:", error);
    //             setError(error.message);
    //         }
    //     };


    //     fetchMoreData();
    // }, []);


    //added error handling
    if (error) {
        return <div>Error: {error}</div>;
    }


    if (!cryptoData) { // loading state handling
        return <div>Loading...</div>;
    }


     //Ensure that market_data and its price array are defined before accessing
     const marketData = cryptoData.market_data;
     if (!marketData || !marketData.price || !marketData.price[0]) {
         return <div>Loading...</div>;
     }
     const priceData = marketData.price[0];
    return (

//priceData.price_latest ? `${Number(priceData.price_latest).toLocaleString('en-US')}` : `N/A`
        <Grid container>
            <Grid item>
                <Coin
                    key={cryptoData.id ? cryptoData.id : `N/A`}
                    coinId={cryptoData.id ? cryptoData.id : `N/A`}
                    name={cryptoData.name ? cryptoData.name : `N/A`}
                    price={priceData.price_latest ? `${Number(priceData.price_latest).toLocaleString('en-US')}` : `N/A`}
                    symbol={cryptoData.symbol ? cryptoData.symbol : `N/A`}
                    logo={cryptoData.logo ? cryptoData.logo : `N/A`}
                    volume={priceData.vol_spot_24h ? formatHighNum(priceData.vol_spot_24h) : `N/A`}
                    percentChange24H={priceData.price_change_percentage_24h ? priceData.price_change_percentage_24h : `N/A`}
                    rank={cryptoData.rank ? `#${cryptoData.rank}` : `N/A`}
                    rating={cryptoData.rating ? cryptoData.rating.rating : 'N/A'}
                    marketCap={priceData.market_cap ? formatHighNum(priceData.market_cap) : `N/A`}
                    circulatingSupply={marketData.circulating_supply ? formatHighNum(marketData.circulating_supply) : `N/A`}
                    totalSupply={marketData.max_supply ? formatHighNum(marketData.max_supply) : `N/A`}
                    low={priceData.low_24h ? `$${Number(priceData.low_24h).toLocaleString('en-US')}` : `N/A`}
                    high={priceData.high_24h ? `$${Number(priceData.high_24h).toLocaleString('en-US')}` : `N/A`}
                // need to add more data points
                // ^^^like what???
                />
            </Grid>
        </Grid>
    );
};

export default CoinPage;
