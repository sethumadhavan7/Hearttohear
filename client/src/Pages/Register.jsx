import React, { useState } from 'react';
import Api from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
        <RegisterContainer>
            <h1>Register</h1>
            <RegisterForm onSubmit={handleRegister}>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input
                        type="text"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Age:</Label>
                    <Input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter your age"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Mobile:</Label>
                    <Input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Interests:</Label>
                    <Select
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    >
                        <option value="">Select Interest</option>
                        <option value="Sports">Sports</option>
                        <option value="Listening to Songs">Listening to Songs</option>
                        <option value="Travelling">Travelling</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Language:</Label>
                    <Input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        placeholder="Enter your preferred language"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Gender:</Label>
                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Role:</Label>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="client">Client</option>
                        <option value="helper">Helper</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password:</Label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                </FormGroup>
                <ButtonContainer>
                    <Button type="submit">Register</Button>
                </ButtonContainer>
            </RegisterForm>
        </RegisterContainer>
    );
};

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #e8f5e9; /* Light green background */
    padding: 20px;
    
    h1 {
        margin-bottom: 20px;
        color: #4CAF50; /* Green color for heading */
    }
`;

const RegisterForm = styled.form`
    width: 100%;
    height: 90%;
    max-width: 500px;
    background-color: #ffffff; /* White background for form */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
`;

const Label = styled.label`
    display: block;
    color: #333; /* Dark text color */
`;

const Input = styled.input`
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 10px;
`;

const Select = styled.select`
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.button`
    width: 150px;
    padding: 5px;
    background-color: #4CAF50; /* Green background for button */
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #388e3c; /* Darker green on hover */
    }
`;

export default Register;
