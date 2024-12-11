import React from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  return (
    <Container>
      <BackgroundAnimation />
      <Nav>
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </Nav>
      <Section>
        <Text>
          <h2>Why face it alone?<br />Connect, share,<br />heal.</h2>
        </Text>
        <Image src={mental} alt="mental health" />
      </Section>
    </Container>
  );
};

const BackgroundAnimation = () => {
  const blocksAndChains = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    type: Math.random() > 0.5 ? 'block' : 'chain',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
  }));

  return (
    <AnimationContainer>
      {blocksAndChains.map((item) => (
        <AnimationItem
          key={item.id}
          className={item.type}
          style={{ top: item.top, left: item.left }}
        />
      ))}
    </AnimationContainer>
  );
};

const Container = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #333;
  padding: 20px;
  position: relative; /* Added to contain background animation */
  overflow: hidden; /* Ensures flowing elements stay within bounds */
`;

const AnimationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.5; }
  50% { transform: translateY(-20px) translateX(10px) rotate(45deg); opacity: 1; }
  100% { transform: translateY(0) translateX(20px) rotate(90deg); opacity: 0.5; }
`;

const AnimationItem = styled.div`
  position: absolute;
  animation: ${floatAnimation} 10s infinite ease-in-out;
  
  &.block {
    width: 20px;
    height: 20px;
    background-color: rgba(52, 152, 219, 0.6); /* Light blue */
    border-radius: 5px;
  }

  &.chain {
    width: 4px;
    height: 40px;
    background-color: rgba(155, 89, 182, 0.6); /* Light purple */
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1rem;

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

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:nth-child(odd) {
    background-color: #e8f5e9;
  }
`;

const Text = styled.div`
  flex: 1;
  padding: 20px;

  h2 {
    margin: 0;
    font-size: 80px;
    font-family: 'Josefin Sans', sans-serif;
    line-height: 1.4;
    margin-bottom: 10rem;
  }
`;

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

  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(0, 128, 0, 0.9));
  }
`;

export default Homepage;
