import React from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';  // Ensure this path is correct
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  return (
    <Container>
      <Nav>
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </Nav>
      <BackgroundAnimation>
        {/* Create 3D cubes and chain blocks */}
        {Array(10).fill(0).map((_, index) => (
          <Chain key={index} />
        ))}
      </BackgroundAnimation>
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
  position: relative;
  z-index: 2; /* Ensure it sits on top of animation */
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
  animation: ${bounce} 2s infinite ease-in-out; /* Bouncing effect */

  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 20px rgba(0, 128, 0, 0.9));
  }
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1; /* Ensure it sits behind the content */
  pointer-events: none; /* Ensure interaction with website is not blocked */
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

const move = keyframes`
  0% {
    transform: translateX(100%) translateY(100%) rotateX(0) rotateY(0);
  }
  50% {
    transform: translateX(0) translateY(0) rotateX(180deg) rotateY(180deg);
  }
  100% {
    transform: translateX(-100%) translateY(-100%) rotateX(360deg) rotateY(360deg);
  }
`;

const Chain = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgba(144, 238, 144, 0.7); /* Light green with transparency */
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(144, 238, 144, 0.8);
  transform: rotate(45deg);
  animation: ${move} 15s linear infinite;
  top: ${(props) => Math.random() * 100}%;
  left: ${(props) => Math.random() * 100}%;
  opacity: 0.9;
  z-index: 2;
`;

export default Homepage;
