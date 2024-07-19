import React, { useState } from 'react';

import styled from 'styled-components';


const Helper = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [coins, setCoins] = useState(0);

  const handleAvailabilityToggle = () => {
    setIsAvailable(prevState => !prevState);
  };

  return (
    <Container>
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        <h2>Coins: {coins}</h2>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <button onClick={handleAvailabilityToggle}>
          {isAvailable ? 'offline' : 'online'}
        </button>
      </div>

     
    </Container>
  );
};

const Container = styled.div`


.box{
 padding: 10px;
  border: 1px solid black;
  width: 500px;
  img{
    height: 5rem;
  }
}
`

export default Helper;
