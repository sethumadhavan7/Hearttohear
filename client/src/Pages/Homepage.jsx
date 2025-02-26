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
        {/* Section 1: Mental Health */}
        <Section>
          <Text>
            <h2>sleepsense<br/>Intelligent Wristband for Sleep Tracking & Health Advice</h2>
          </Text>
          <BouncingImage 
            src={mental} 
            alt="mental health"
          />
        </Section>

        {/* Section 2: Happy */}
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

        {/* Section 3: Alone */}
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

      {/* Floating Elements for Background Animation */}
      <FloatingElements />
    </Container>
  );
};

/* Enable Scrolling */
const Container = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #333;
  overflow-y: auto; /* Enables vertical scrolling */
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px; /* Adds space between sections */
  padding: 20px;
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

  a {
    text-decoration: none;
    color: inherit;
  }
`;

/* Section Styling */
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
  min-height: 60vh; /* Adjusted for proper scrolling */
`;

const Text = styled.div`
  flex: 1;
  padding: 20px;

  h2 {
    margin: 0;
    font-size: 40px;
    font-family: "Josefin Sans", sans-serif;
    line-height: 1.4;
  }

  h3 {
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

/* Normal Image with Hover Effect */
const Image = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;

  transform: ${({ hovered }) => (hovered ? 'scale(1.1)' : 'scale(1)')};
  filter: ${({ hovered }) => 
    hovered 
      ? 'drop-shadow(0 0 20px rgba(0, 128, 0, 0.9))' 
      : 'drop-shadow(0 0 10px rgba(0, 128, 0, 0.7))'};
`;

/* Floating Background Elements */
const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
  100% { transform: translate(0, 0); }
`;

const FloatingElement = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '10px')};
  animation: ${float} ${({ duration }) => duration}s infinite ease-in-out;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  opacity: 0.7;
`;

const FloatingElements = () => {
  const elements = [
    { size: 80, color: 'rgba(40, 167, 69, 0.3)', shape: 'circle', duration: 10, top: 10, left: 20 },
    { size: 120, color: 'rgba(255, 193, 7, 0.3)', shape: 'square', duration: 8, top: 30, left: 70 },
    { size: 60, color: 'rgba(33, 150, 243, 0.3)', shape: 'circle', duration: 12, top: 50, left: 40 },
    { size: 100, color: 'rgba(156, 39, 176, 0.3)', shape: 'square', duration: 9, top: 70, left: 10 },
  ];

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          size={element.size}
          color={element.color}
          shape={element.shape}
          duration={element.duration}
          top={element.top}
          left={element.left}
        />
      ))}
    </>
  );
};

export default Homepage;
