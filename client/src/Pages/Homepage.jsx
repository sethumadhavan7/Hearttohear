import React from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  return (
    <Container>
      <Nav>
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </Nav>
      <BackgroundAnimation>
        {/* Add many blocks/chains flowing across */}
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
  position: relative; /* Ensures it sits on top of animation */
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
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1; /* Ensure it sits above other content */
`;

const move = keyframes`
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Chain = styled.div`
  position: absolute;
  width: 200px;  /* Increased size for larger blocks */
  height: 30px;  /* Larger block height */
  background-color: rgba(144, 238, 144, 0.5); /* Light green with transparency */
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(144, 238, 144, 0.8);
  animation: ${move} 15s linear infinite;
  top: ${(props) => Math.random() * 100}%;
  left: ${(props) => Math.random() * 100}%;
  opacity: 0.8;
  transform: rotate(45deg);
  animation-delay: ${(props) => Math.random() * 5}s; /* Slight delay for varied animation */
  z-index: 2; /* Ensure blocks are on top of the background */
`;

export default Homepage;
