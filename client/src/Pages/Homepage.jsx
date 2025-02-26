import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import happy from '../img/happy.png';
import alone from '../img/alone.png';
import styled from 'styled-components';

const Homepage = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <Container>
      <Nav>
        <StyledLink to="/login"><Button>Log In</Button></StyledLink>
        <StyledLink to="/register"><Button>Register</Button></StyledLink>
      </Nav>

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
    </Container>
  );
};

const Container = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  color: #333;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(-45deg, #a1c4fd, #c2e9fb, #d4fc79, #96e6a1);
  background-size: 400% 400%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(to right, #28a745, #218838);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.3);
  }
`;

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

const Image = styled.img`
  flex: 1;
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease, filter 0.3s ease;
  transform: ${({ hovered }) => (hovered ? 'scale(1.1)' : 'scale(1)')};
  filter: ${({ hovered }) => hovered ? 'brightness(1.2) drop-shadow(0px 0px 10px #34d399)' : 'brightness(1)'};
`;

export default Homepage;
