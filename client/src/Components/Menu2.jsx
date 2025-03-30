import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Menu2 = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('Mental-App');
    navigate('/');
  };

  return (
    <Div>
      <ToggleMenuButton onClick={handleToggleMenu}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </ToggleMenuButton>
      {showMenu && (
        <MenuContainer>
          <Link to={'/helper'}><MenuItem>Home</MenuItem></Link>
          <Link to={'/request'}><MenuItem>Requests</MenuItem></Link>
          <Link to={'/crypto'}><MenuItem>Crypto</MenuItem></Link>
          <LogoutButton onClick={handleLogout}>LogOut</LogoutButton>
        </MenuContainer>
      )}
    </Div>
  );
};

// Updated Styled Components with Violet Theme
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 99;
`;

const ToggleMenuButton = styled.button`
  background-color: #8a2be2; /* Violet */
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(138, 43, 226, 0.3);

  &:hover {
    background-color: #9932cc; /* Darker violet */
    transform: translateY(-2px);
  }

  svg {
    stroke: white;
  }
`;

const MenuContainer = styled.div`
  background-color: #ffffff;
  padding: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.15);
  width: 200px;
  z-index: 99;
  position: absolute;
  top: 50px;
  right: 0;
  border: 1px solid #e6d5ff;

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

const MenuItem = styled.div`
  padding: 12px 20px;
  margin: 5px 10px;
  background-color: #f5f0ff; /* Light violet */
  text-align: center;
  border-radius: 6px;
  color: #4b0082; /* Dark violet */
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e6d5ff; /* Medium violet */
    transform: translateX(3px);
  }

  &:active {
    transform: translateX(0);
  }
`;

const LogoutButton = styled.p`
  color: #ff4757 !important;
  text-align: center;
  cursor: pointer;
  padding: 12px 20px;
  margin: 5px 10px;
  background-color: #fff0f0;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffdfdf;
    transform: translateX(3px);
  }
`;

export default Menu2;
