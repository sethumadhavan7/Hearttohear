import React from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import styled, { keyframes } from 'styled-components';

// Keyframes for animation
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const move = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100vw);
  }
`;

const Homepage = () => {
  return (
    <Container>
      <Nav>
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </Nav>
      <AnimationContainer>
        <ChainBlock />
        <ChainBlock />
        <ChainBlock />
      </AnimationContainer>
      <Section>
        <Text>
          <h2>Why face it alone?<br />Connect, share,<br />heal.</h2>
        </Text>
        <Image src={mental} alt="mental health" />
      </Section>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #333;
  padding: 20px;
  position: relative;
  overflow: hidden;
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
  flex-direction: row;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Text = styled.div`
  flex: 1;
  padding: 20px;

  h2 {
    margin: 0;
    font-size: 80px;
    font-family: "Josefin Sans", sans-serif;
    line-height: 1.4;
    margin-bottom: 10rem;
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
  animation: ${float} 3s infinite ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(0, 128, 0, 0.9));
  }
`;

// Animation Container
const AnimationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

// ChainBlock Style
const ChainBlock = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #90ee90;
  border: 2px solid #66cc66;
  border-radius: 5px;
  animation: ${move} 10s linear infinite, ${float} 5s ease-in-out infinite;
  top: ${(props) => Math.random() * 100}%;
  left: ${(props) => Math.random() * 100}%;
  opacity: 0.7;
`;
