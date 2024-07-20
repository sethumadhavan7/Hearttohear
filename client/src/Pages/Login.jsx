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
      const formData = {
        mobile,
        password,
      };

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
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Mobile No:</Label>
          <Input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={loading}
            placeholder="Enter your mobile number"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Enter your password"
          />
        </FormGroup>
        {error && <Error>{error}</Error>}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e8f5e9;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  color: #4caf50;
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  background-color: #ffffff;
  border: 1px solid #4caf50;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 15px;
    max-width: 100%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  display: block;
  color: #388e3c;
  margin-bottom: 5px;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #4caf50;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-top: 8px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`;

export default Login;
