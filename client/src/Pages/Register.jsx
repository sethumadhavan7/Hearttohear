import React, { useState } from 'react';
import Api from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Register = () => {
    const [userName, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [mail, setMail] = useState('');
    const [interests, setInterests] = useState('');
    const [language, setLanguage] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigator = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = {
            userName,
            age,
            mobile,
            mail,
            interests,
            language,
            gender,
            role,
            password
        };

        try {
            if (mobile.length === 10 && confirmPassword === password) {
                const response = await Api.post('/auth/register', formData);
                if (response.status) {
                    navigator('/login');
                }
            } else {
                alert("Please fill the form correctly");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GlassContainer>
            <GlassForm onSubmit={handleRegister}>
                <GlassTitle>Create Account</GlassTitle>
                
                <FormRow>
                    <FormGroup>
                        <GlassLabel>Username:</GlassLabel>
                        <GlassInput
                            type="text"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <GlassLabel>Age:</GlassLabel>
                        <GlassInput
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                        />
                    </FormGroup>
                </FormRow>
                
                <FormRow>
                    <FormGroup>
                        <GlassLabel>Mobile:</GlassLabel>
                        <GlassInput
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter your mobile number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <GlassLabel>Email:</GlassLabel>
                        <GlassInput
                            type="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormGroup>
                </FormRow>
                
                <FormRow>
                    <FormGroup>
                        <GlassLabel>Interests:</GlassLabel>
                        <GlassSelect
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                        >
                            <option value="">Select Interest</option>
                            <option value="Sports">Sports</option>
                            <option value="Listening to Songs">Listening to Songs</option>
                            <option value="Travelling">Travelling</option>
                        </GlassSelect>
                    </FormGroup>
                    <FormGroup>
                        <GlassLabel>Language:</GlassLabel>
                        <GlassInput
                            type="text"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            placeholder="Enter your preferred language"
                        />
                    </FormGroup>
                </FormRow>
                
                <FormRow>
                    <FormGroup>
                        <GlassLabel>Gender:</GlassLabel>
                        <GlassSelect
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </GlassSelect>
                    </FormGroup>
                    <FormGroup>
                        <GlassLabel>Role:</GlassLabel>
                        <GlassSelect
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select Role</option>
                            <option value="client">Client</option>
                            <option value="helper">Helper</option>
                        </GlassSelect>
                    </FormGroup>
                </FormRow>
                
                <FormRow>
                    <FormGroup>
                        <GlassLabel>Password:</GlassLabel>
                        <GlassInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <GlassLabel>Confirm Password:</GlassLabel>
                        <GlassInput
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                        />
                    </FormGroup>
                </FormRow>
                
                <GlassButton type="submit">Register</GlassButton>
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
  max-width: 800px;
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

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 200px;
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

const GlassSelect = styled.select`
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;

  option {
    background: #8e24aa;
    color: white;
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

const GlassButton = styled.button`
  width: 100%;
  max-width: 300px;
  margin: 20px auto 0;
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
  display: block;

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

  @media (max-width: 600px) {
    padding: 14px;
    font-size: 1rem;
    max-width: 100%;
  }
`;

export default Register;
