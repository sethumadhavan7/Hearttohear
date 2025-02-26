import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import happy from '../img/happy.png';
import alone from '../img/alone.png';
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  const [hoveredHappy, setHoveredHappy] = useState(false);
  const [hoveredAlone, setHoveredAlone] = useState(false);

  return (
    <Container>
      <Nav>
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </Nav>

      <MainContent>
        <Section>
          <Text>
            <h2>sleepsense<br/>Intelligent Wristband for Sleep Tracking & Health Advice</h2>
          </Text>
          <BouncingImage src={mental} alt="mental health" />
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
  );
};

/* Global Styles for Full Page Scrolling */
const Container = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto; /* Ensures full scrolling */
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px; /* Space between sections */
  padding: 20px;
  flex-grow: 1;
  min-height: 100vh; /* Ensures content fits */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #218838;
    }
  }
  a { text-decoration: none; color: inherit; }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 90%;
  min-height: 60vh; /* Allows content to scroll */
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

/* Keyframe for Bouncing Effect */
const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

/* Bouncing Image */
const BouncingImage = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  animation: ${bounce} 2s infinite ease-in-out; /* Automatic bouncing */
`;

/* Image with Hover Effect */
const Image = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  transform: ${({ hovered }) => (hovered ? 'scale(1.1)' : 'scale(1)')};
  filter: ${({ hovered }) => hovered ? 'drop-shadow(0 0 20px rgba(0, 128, 0, 0.9))' : 'drop-shadow(0 0 10px rgba(0, 128, 0, 0.7))'};
`;

/* Set Body & HTML to Enable Scrolling */
const GlobalStyles = `
  html, body {
    height: 100vh;
    overflow-y: auto;
  }
`;

export default Homepage;
