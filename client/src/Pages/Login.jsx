import React, { useState } from 'react';
import Api from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = { mobile, password };
      const response = await Api.post('/auth/login', formData);
      console.log(response.data.user);

      if (response.data.user.role === 'client') {
        localStorage.setItem('Mental-App', JSON.stringify(response.data.user));
        navigate('/client');
      } else if (response.data.user.role === 'helper') {
        localStorage.setItem('Mental-App', JSON.stringify(response.data.user));
        navigate('/helper');
      }
    } catch (error) {
      console.log(error);
      setError('Login failed. Please check your credentials.');
    }

    setLoading(false);
  };

  return (
    <Container>
      <FormContainer>
        <Title>Welcome Back</Title>
        <Subtitle>Please login to continue</Subtitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={loading}
              placeholder="Mobile Number"
              className="input-3d"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Password"
              className="input-3d"
            />
          </FormGroup>
          {error && <Error>{error}</Error>}
          <SubmitButton type="submit" disabled={loading} className="button-3d">
            {loading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </Form>
        <FooterText>Don't have an account? <span>Sign up</span></FooterText>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #7b1fa2 0%, #4a0072 100%);
  padding: 20px;
  box-sizing: border-box;
  perspective: 1000px;
  
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 -5px 0 0 rgba(0, 0, 0, 0.1) inset;
  transform-style: preserve-3d;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) rotateX(5deg);
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset,
      0 -8px 0 0 rgba(0, 0, 0, 0.15) inset;
  }
  
  @media (max-width: 600px) {
    padding: 30px 20px;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  color: #4a0072;
  margin-bottom: 10px;
  font-size: 28px;
  text-align: center;
  font-weight: 700;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
  
  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 16px;
  background: #f5f5f5;
  transition: all 0.3s ease;
  box-shadow: 
    0 2px 5px rgba(0, 0, 0, 0.1) inset,
    0 1px 0 rgba(255, 255, 255, 0.5);
  
  &.input-3d {
    transform-style: preserve-3d;
    position: relative;
    
    &:focus {
      outline: none;
      background: white;
      box-shadow: 
        0 0 0 2px #8e24aa,
        0 5px 15px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 12px 15px;
  }
`;

const Error = styled.div`
  color: #e53935;
  margin: -10px 0 15px;
  font-size: 14px;
  text-align: center;
  padding: 5px;
  background: rgba(229, 57, 53, 0.1);
  border-radius: 5px;

  @media (max-width: 600px) {
    font-size: 12px;
    margin: -5px 0 10px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #8e24aa 0%, #4a0072 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 0 0 #38006b,
    0 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &.button-3d {
    transform-style: preserve-3d;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 6px 0 0 #38006b,
        0 8px 15px rgba(0, 0, 0, 0.3);
    }
    
    &:active {
      transform: translateY(2px);
      box-shadow: 
        0 2px 0 0 #38006b,
        0 3px 5px rgba(0, 0, 0, 0.2);
    }
    
    &:disabled {
      background: linear-gradient(135deg, #b39ddb 0%, #9575cd 100%);
      box-shadow: 
        0 4px 0 0 #7e57c2,
        0 5px 10px rgba(0, 0, 0, 0.1);
      cursor: not-allowed;
    }
  }

  @media (max-width: 600px) {
    font-size: 16px;
    padding: 14px;
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: #666;
  margin-top: 25px;
  font-size: 14px;
  
  span {
    color: #8e24aa;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
      color: #4a0072;
    }
  }

  @media (max-width: 600px) {
    margin-top: 20px;
    font-size: 13px;
  }
`;

export default Login;
