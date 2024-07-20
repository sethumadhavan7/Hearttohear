import React, { useState } from 'react';

import styled from 'styled-components';
import Menu2 from '../Components/Menu2';


const Helper = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [coins, setCoins] = useState(0);

  const handleAvailabilityToggle = () => {
    setIsAvailable(prevState => !prevState);
  };

  return (
    <Container>
      <div className="menu">
        <Menu2/>
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
  .menu {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
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