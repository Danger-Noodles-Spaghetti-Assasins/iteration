import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coin from './E.Coin'; // Assuming E.Coin is your Coin component
import Graph from './G.Graph'; // Assuming G.Graph is your Graph component

const Profile = () => {
  const [favCoinNames, setFavCoinNames] = useState([]);
  const [favCoinDetails, setFavCoinDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavCoins = async () => {
      try {
        const response = await axios.get("/api/displayFavCoins");
        setFavCoinNames(response.data.favCoins);
      } catch (error) {
        setError("Error fetching favorite coins: " + error.message);
        console.error("Error fetching favorite coins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavCoins();
  }, []);

  useEffect(() => {
    const fetchCoinDetails = async (coinName) => {
      try {
        const response = await axios.get(`/api/completeCoin/${coinName}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching details for coin ${coinName}:`, error);
        return null;
      }
    };

    const loadCoinDetails = async () => {
      setLoading(true);
      const coinDetailsPromises = favCoinNames.map((coinName) =>
        fetchCoinDetails(coinName)
      );
      const coinDetails = await Promise.all(coinDetailsPromises);
      setFavCoinDetails(coinDetails.filter(detail => detail !== null));
      setLoading(false);
    };

    if (favCoinNames.length > 0) {
      loadCoinDetails();
    }
  }, [favCoinNames]);

  const handleRemove = async (coinId) => {
    try {
      await axios.post("/api/deleteFavCoin", { coinId });
      setFavCoinNames(prev => prev.filter(name => name !== coinId));
    } catch (error) {
      console.error("Error removing favorite coin:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (favCoinDetails.length === 0) {
    return <div>No favorite coins found.</div>;
  }

  return (
    <div className='container'>
      {favCoinDetails.map((coin) => {

        const cryptoData = coin.data;
        const marketData = cryptoData.market_data;
        const priceData = marketData.price[0];

        return (
          <div key={cryptoData.id} className="coin-container">
            <div className='content'>
              <Coin
                key={cryptoData.id}
                coinId={cryptoData.id}
                name={cryptoData.name || 'N/A'}
                price={priceData.price_latest ? `${Number(priceData.price_latest).toLocaleString('en-US')}` : 'N/A'}
                symbol={cryptoData.symbol || 'N/A'}
                logo={cryptoData.logo || 'N/A'}
                volume={priceData.vol_spot_24h ? `$${Number(priceData.vol_spot_24h).toLocaleString('en-US')}` : 'N/A'}
                percentChange24H={priceData.price_change_percentage_24h || 'N/A'}
                rank={cryptoData.rank ? `#${cryptoData.rank}` : 'N/A'}
                rating={cryptoData.rating ? cryptoData.rating.rating : 'N/A'}
                marketCap={priceData.market_cap ? `$${Number(priceData.market_cap).toLocaleString('en-US')}` : 'N/A'}
                circulatingSupply={marketData.circulating_supply ? `${Number(marketData.circulating_supply).toLocaleString('en-US')}` : 'N/A'}
                totalSupply={marketData.max_supply ? `${Number(marketData.max_supply).toLocaleString('en-US')}` : 'N/A'}
                low={priceData.low_24h ? `$${Number(priceData.low_24h).toLocaleString('en-US')}` : 'N/A'}
                high={priceData.high_24h ? `$${Number(priceData.high_24h).toLocaleString('en-US')}` : 'N/A'}
                isFavorite={true} // new prop: indicating the coin is a favorite
                onRemoveFromFavorites={handleRemove} // new prop: handler for removing from favorites
              />
              <Graph coinId={cryptoData.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;