import React, { useEffect } from 'react';
import profile from '../img/profile.svg'

import styled from 'styled-components';


const Client = () => {

  useEffect(()=>{

      

  })
 
  return (
    <Container>
     <h1>client</h1>
     <h1>Suggested Users</h1>
        <div className="box">
          <div className="user">
            
          </div>
          <img src={profile}  alt="profile" srcset="" />
          <h3>Dharaneedahran</h3>
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
export default Client;
