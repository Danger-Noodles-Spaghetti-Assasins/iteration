import React, { useState } from 'react';
import styled from 'styled-components';
import '../Styling/C.PreviewCard.css';

const PreviewCard = ({ name, price, symbol, logo, rank }) => { // Added onClick prop
  const [checked, setChecked] = useState(false);

  const handleSelect = (event) => {
    event.stopPropagation(); //allows click on select btn w/o triggering whole card click
    setChecked(!checked);
  };

  return (
    <section className='previewCard'>
      <div id="header">
        {/* <CheckBoxStyle type="checkbox" checked={checked} onChange={handleSelect} />
        <CompareText>Compare</CompareText> */}
      </div>
      <h3>{name}</h3>
      <img id="logo" src={logo} alt={`${name} logo`} />
      <div id="footer">
        <div id="price"><b>Active Price:</b> ${Number(price.toFixed(2)).toLocaleString('en-US')}</div>
        <div id="rank"><b>Rank:</b> #{rank}</div>
      </div>
    </section>
  );
};

export default PreviewCard;