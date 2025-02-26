import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import happy from '../img/happy.png';
import alone from '../img/alone.png';
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  const [hoveredMental, setHoveredMental] = useState(false);
  const [hoveredHappy, setHoveredHappy] = useState(false);
  const [hoveredAlone, setHoveredAlone] = useState(false);

  return (
    <Container>
      <Nav>
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </Nav>

      {/* Section 1: Mental Health */}
      <Section>
        <Text>
          <h2>sleepsense<br/>Intelligent Wristband for Sleep Tracking & Health Advice<br/></h2>
        </Text>
        <Image 
          src={mental} 
          alt="mental health" 
          onMouseEnter={() => setHoveredMental(true)}
          onMouseLeave={() => setHoveredMental(false)}
          hovered={hoveredMental}
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

      {/* Floating Elements for Background Animation */}
      <FloatingElements />
    </Container>
  );
}

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Image = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 5rem;
  border: 5px solid transparent;
  filter: drop-shadow(0 0 10px rgba(0, 128, 0, 0.7));
  animation: ${bounce} 2s infinite ease-in-out;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;

  transform: ${({ hovered }) => (hovered ? 'scale(1.1)' : 'scale(1)')};
  filter: ${({ hovered }) => 
    hovered 
      ? 'drop-shadow(0 0 20px rgba(0, 128, 0, 0.9))' 
      : 'drop-shadow(0 0 10px rgba(0, 128, 0, 0.7))'};
`;

export default Homepage;
