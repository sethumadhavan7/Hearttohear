import React from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import happy from '../img/happy.png';
import alone from '../img/alone.png';
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  return (
    <Container>
      <Nav>
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </Nav>
      <Section>
        <Text>
          <h2>Why face it alone?<br />Connect, share,<br/> heal.</h2>
        </Text>
        <Image src={mental} alt="mental health" />
      </Section>
      <FloatingCubes /> 
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif, sans-serif;
  color: #333;
  padding: 20px;
  position: relative; /* Add position relative to allow absolute positioning of cubes */
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
    font-family: "Josefin Sans", sans-serif;
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

const FloatingCube = styled.div`
  position: absolute;
  width: 80px; 
  height: 80px; 
  background-color: rgba(128, 255, 128, 0.1); 
  border: 1px solid rgba(128, 255, 128, 0.5); 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transform: rotate(45deg); 
  animation: float 5s infinite ease-in-out; 
`;

const float = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(45deg);
  }
  25% {
    transform: translateX(50px) translateY(20px) rotate(45deg);
  }
  50% {
    transform: translateX(0) translateY(40px) rotate(45deg);
  }
  75% {
    transform: translateX(-50px) translateY(20px) rotate(45deg);
  }
  100% {
    transform: translateX(0) translateY(0) rotate(45deg);
  }
`;

const FloatingCubes = () => {
  const cubePositions = [
    { top: '10%', left: '10%' },
    { top: '25%', left: '30%' },
    { top: '40%', left: '10%' },
    { top: '55%', left: '30%' },
    { top: '70%', left: '10%' },
    { top: '20%', right: '10%' },
    { top: '35%', right: '30%' },
    { top: '50%', right: '10%' },
    { top: '65%', right: '30%' },
  ];

  return (
    <>
      {cubePositions.map((position, index) => (
        <FloatingCube key={index} style={position} />
      ))}
    </>
  );
};

export default Homepage;
