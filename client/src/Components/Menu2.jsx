import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Menu2 = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate()


  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout =()=>{
    localStorage.removeItem('Mental-App');
    navigate('/')
  }

  return (
    <Div>
      <ToggleMenuButton onClick={handleToggleMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </ToggleMenuButton>
      {showMenu && (
        <MenuContainer>
          <Link to={'/helper'}><MenuItem>Home</MenuItem></Link>
          <Link to={'/request'}><MenuItem>Requests</MenuItem></Link>
          <p style={{color:'red',textAlign:'center',cursor:'pointer'}} onClick={handleLogout} >LogOut</p>
        </MenuContainer>
      )}
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 99;
`

const ToggleMenuButton = styled.button`
  background-color: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: right;
  &:hover {
    background-color: #1b5e20;
  }
`;

const MenuContainer = styled.div`
  background-color: #f5f5f5;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 99;
  a{
    text-decoration: none;
    color: inherit;
  }
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  margin: 2px;
  background-color: #ddf1ce;
  text-align: center;
  &:hover{
    background-color: #d1edbb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default Menu2;