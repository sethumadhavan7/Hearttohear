import React, { useState } from 'react';
import Api from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
    <GlassContainer>
      <GlassForm onSubmit={handleSubmit}>
        <GlassTitle>Login</GlassTitle>
        <FormGroup>
          <GlassLabel>Mobile No:</GlassLabel>
          <GlassInput
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={loading}
            placeholder="Enter your mobile number"
          />
        </FormGroup>
        <FormGroup>
          <GlassLabel>Password:</GlassLabel>
          <GlassInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Enter your password"
          />
        </FormGroup>
        {error && <GlassError>{error}</GlassError>}
        <GlassButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </GlassButton>
      </GlassForm>
    </GlassContainer>
  );
};

// Glass morphism styles
const GlassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #8e24aa 0%, #4a0072 100%);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    transform: rotate(30deg);
    animation: ${keyframes`
      0% { transform: rotate(30deg) translate(-10%, -10%); }
      100% { transform: rotate(30deg) translate(10%, 10%); }
    `} 8s infinite alternate;
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const GlassForm = styled.form`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  z-index: 1;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px) rotateX(2deg);
  }

  @media (max-width: 600px) {
    padding: 30px 20px;
    max-width: 100%;
  }
`;

const GlassTitle = styled.h1`
  color: white;
  margin-bottom: 30px;
  font-size: 2.2rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;

  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const GlassLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const GlassInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 600px) {
    padding: 12px 15px;
    font-size: 0.9rem;
  }
`;

const GlassError = styled.div`
  color: #ff6b6b;
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const GlassButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 14px;
    font-size: 1rem;
  }
`;

export default Login;
