import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import mental from '../img/mental.png';
import happy from '../img/happy.png';
import alone from '../img/alone.png';

const Homepage = () => {
  const [hoveredHappy, setHoveredHappy] = useState(false);
  const [hoveredAlone, setHoveredAlone] = useState(false);
  const [hoveredMental, setHoveredMental] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Nav>
          <Link to="/login"><button>Log In</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </Nav>

        <MainContent>
          <Section>
            <Text>
              <h2>Sleep Is The<br/>Best Meditation</h2>
            </Text>
            <Image 
              src={mental} 
              alt="mental health" 
              onMouseEnter={() => setHoveredMental(true)}
              onMouseLeave={() => setHoveredMental(false)}
              hovered={hoveredMental}
            />
          </Section>

          <Section reverse>
            <Image 
              src={happy} 
              alt="happy" 
              onMouseEnter={() => setHoveredHappy(true)}
              onMouseLeave={() => setHoveredHappy(false)}
              hovered={hoveredHappy}
            />
            <Text>
              <h3>Feel Happier<br/>Track your mood and get personalized advice to improve your mental well-being.</h3>
            </Text>
          </Section>

          <Section>
            <Text>
              <h3>Never Feel Alone<br/>Connect with others and share your journey towards better sleep and health.</h3>
            </Text>
            <Image 
              src={alone} 
              alt="alone" 
              onMouseEnter={() => setHoveredAlone(true)}
              onMouseLeave={() => setHoveredAlone(false)}
              hovered={hoveredAlone}
            />
          </Section>
        </MainContent>
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #e8e3f0, #d1c4e9);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #6a1b9a;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #4a148c;
    }
  }
  a { text-decoration: none; color: inherit; }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px;
  flex-grow: 1;
  min-height: 150vh;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  background-color: #fff;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 30px auto;
  width: 90%;
  min-height: 80vh;
`;

const Text = styled.div`
  flex: 1;
  padding: 20px;
  h2, h3 {
    margin: 0;
    font-size: 30px;
    font-family: "Josefin Sans", sans-serif;
    line-height: 1.4;
  }
`;

const Image = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  transform: ${({ hovered }) => (hovered ? 'scale(1.1)' : 'scale(1)')};
  filter: ${({ hovered }) => hovered ? 'drop-shadow(0 0 20px rgba(98, 0, 128, 0.9))' : 'drop-shadow(0 0 10px rgba(98, 0, 128, 0.7))'};
`;

export default Homepage;
