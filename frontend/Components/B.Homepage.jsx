import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PreviewCard from './C.PreviewCard';
import Select from 'react-select';
import '../Styling/B.Homepage.css';

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
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        //format the API response for react-select
        let options = cryptoData.map(function (coin) {
            return { value: coin.name, label: coin.name };
        })
        setFilteredData(options);
    }, [searchTerm, cryptoData]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

  

    // const handleSelectChange = (selectedOption) => {
    //     navigate(`/coin/${selectedOption.value}`);
    // };


    return (
        <div id="container">
            <h1 id='homepageTitle'>CryptoShield</h1>

            <div id='cardContainer'>
                {cryptoData.map((crypto, index) => (
                <Link key={index} to={`/coinpage/${crypto.id}`} style={{ textDecoration: 'none' }}>
                    <PreviewCard
                    name={crypto.name}
                    price={crypto.price}
                    logo={crypto.logo}
                    rank={index + 1}
                    symbol={crypto.symbol}
                    />
                </Link>
                ))}
            </div>

            <div id='searchBarContainer'>
                <div className="width100">
                    {/* needed separate div to format width of Select */}
                    <Select
                        styles={{
                            menu: (baseStyles) => ({
                                ...baseStyles,
                                color: 'black',
                            }),
                        }}
                        menuPlacement='auto'
                        placeholder="Search"
                        options={filteredData}
                        value={searchTerm}
                        labelKey='name'
                        valueKey='name'
                        color='black'
                        //onChange={(e) => setSearchTerm(e.target.value)} 
                        onChange={(e) => handleClick(e.value)}
                    />

                </div>
            </div>
        </div>
    );
};

export default HomePage;