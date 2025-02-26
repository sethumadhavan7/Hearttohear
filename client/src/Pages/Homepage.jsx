import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mental from '../img/mental.png';
import styled, { keyframes } from 'styled-components';

const Homepage = () => {
  const [cubes, setCubes] = useState([]);

  useEffect(() => {
    const generateCubes = () => {
      return Array.from({ length: 10 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 60 + 20, // Random size
        duration: Math.random() * 5 + 5, // Random animation speed
      }));
    };

    setCubes(generateCubes());

    // Update cube positions every 5 seconds
    const interval = setInterval(() => {
      setCubes(generateCubes());
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Container>
      <BackgroundAnimation />
      <Nav>
        <Link to="/login"><Button>Log In</Button></Link>
        <Link to="/register"><Button>Register</Button></Link>
      </Nav>
      <Section>
        <Text>
          <h2>Sleep Is The<br />Best Meditation</h2>
        </Text>
        <ImageContainer>
          <AnimatedImage src={mental} alt="mental health" />
        </ImageContainer>
      </Section>
      {cubes.map((cube) => (
        <FloatingCube
          key={cube.id}
          style={{
            top: `${cube.top}%`,
            left: `${cube.left}%`,
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            animationDuration: `${cube.duration}s`,
          }}
        />
      ))}
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #fff;
  padding: 20px;
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #2b5876, #4e4376);
  overflow: hidden;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, #28a745, #218838);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(0, 255, 127, 0.4);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 255, 127, 0.6);
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
  margin-top: 50px;
`;

const Text = styled.div`
  flex: 1;
  padding: 20px;

  h2 {
    margin: 0;
    font-size: 60px;
    font-family: "Josefin Sans", sans-serif;
    line-height: 1.4;
    opacity: 0;
    animation: fadeIn 1.5s forwards ease-in-out;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimatedImage = styled.img`
  max-width: 50%;
  height: auto;
  border-radius: 10px;
  border: 5px solid transparent;
  filter: drop-shadow(0 0 20px rgba(0, 255, 127, 0.7));
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 30px rgba(0, 255, 127, 0.9));
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const FloatingCube = styled.div`
  position: absolute;
  background-color: rgba(128, 255, 128, 0.2);
  border: 1px solid rgba(128, 255, 128, 0.5);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transform: rotate(45deg);
  animation: ${floatAnimation} infinite ease-in-out;
  transition: top 5s linear, left 5s linear; /* Smooth position changes */
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 10%, transparent 90%);
  animation: backgroundMove 8s infinite alternate ease-in-out;
  
  @keyframes backgroundMove {
    0% { transform: translateY(0px) translateX(0px); }
    100% { transform: translateY(-30px) translateX(30px); }
  }
`;

export default Homepage;
