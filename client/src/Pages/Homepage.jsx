import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import happy from '../img/happy.png';
import alone from '../img/alone.png';
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  const [hovered, setHovered] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for floating effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Container>
      <Nav>
        <Link to="/login"><Button>Log In</Button></Link>
        <Link to="/register"><Button>Register</Button></Link>
      </Nav>

      {/* Section 1 */}
      <Section>
        <Text>
          <h2>SleepSense<br/>Smart Wristband for Sleep & Health Tracking</h2>
        </Text>
        <Image 
          src={mental} 
          alt="mental health" 
          onMouseEnter={() => setHovered('mental')}
          onMouseLeave={() => setHovered(null)}
          hovered={hovered === 'mental'}
        />
      </Section>

      {/* Section 2 */}
      <Section reverse>
        <Image 
          src={happy} 
          alt="happy" 
          onMouseEnter={() => setHovered('happy')}
          onMouseLeave={() => setHovered(null)}
          hovered={hovered === 'happy'}
        />
        <Text>
          <h3>Feel Happier<br/>Track your mood & get personalized advice.</h3>
        </Text>
      </Section>

      {/* Section 3 */}
      <Section>
        <Text>
          <h3>Never Feel Alone<br/>Join a community that cares.</h3>
        </Text>
        <Image 
          src={alone} 
          alt="alone" 
          onMouseEnter={() => setHovered('alone')}
          onMouseLeave={() => setHovered(null)}
          hovered={hovered === 'alone'}
        />
      </Section>

      <FloatingElements mousePosition={mousePosition} />
    </Container>
  );
};

// Background Animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Container with animated gradient background
const Container = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  color: #333;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(-45deg, #a1c4fd, #c2e9fb, #d4fc79, #96e6a1);
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 12s ease infinite;
`;

// Styled Navigation Bar
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 10px;
`;

// Modern Buttons with Depth Effect
const Button = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(to right, #28a745, #218838);
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.3);
  }
`;

// Glassmorphism Styled Sections
const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin: 30px;
`;

// Text Styling
const Text = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;

  h2 {
    font-size: 50px;
    color: #fff;
  }

  h3 {
    font-size: 30px;
    color: #fff;
  }
`;

// Animated Image Effect
const Image = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease, filter 0.3s ease;
  
  transform: ${({ hovered }) => (hovered ? 'scale(1.1)' : 'scale(1)')};
  filter: ${({ hovered }) => hovered ? 'brightness(1.2) drop-shadow(0px 0px 10px #34d399)' : 'brightness(1)'};
`;

// Floating Elements with Parallax Effect
const FloatingElements = ({ mousePosition }) => {
  const elements = [
    { size: 80, color: 'rgba(40, 167, 69, 0.3)', shape: 'circle', top: 10, left: 20 },
    { size: 120, color: 'rgba(255, 193, 7, 0.3)', shape: 'square', top: 30, left: 70 },
    { size: 60, color: 'rgba(33, 150, 243, 0.3)', shape: 'circle', top: 50, left: 40 },
  ];

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          size={element.size}
          color={element.color}
          shape={element.shape}
          top={element.top}
          left={element.left}
          x={mousePosition.x}
          y={mousePosition.y}
        />
      ))}
    </>
  );
};

const FloatingElement = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '10px')};
  top: ${({ top, y }) => top + y * 0.002}%;
  left: ${({ left, x }) => left + x * 0.002}%;
  transition: all 0.1s linear;
`;

export default Homepage;
