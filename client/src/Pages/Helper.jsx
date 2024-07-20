import React, { useState, useEffect } from 'react';
import Api from '../Api/Api';
import styled from 'styled-components';
import Menu2 from '../Components/Menu2';

const Helper = () => {
  const [helper, setHelper] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Mental-App"));
    if (storedUser) {
      setHelper(storedUser);
      setIsAvailable(storedUser.availablity);
    }
  }, []);

  const handleAvailabilityToggle = async () => {
    const storedUser = JSON.parse(localStorage.getItem("Mental-App"));
    if (!storedUser || !storedUser._id) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await Api.patch(`/update/availablity/${storedUser._id}`);
      if (response.data.status) {
        setIsAvailable(response.data.availablity);
        storedUser.availablity = response.data.availablity;
        localStorage.setItem("Mental-App", JSON.stringify(storedUser));
        setHelper(storedUser);
        alert("Success");
      } else {
        console.error("Failed to update availability", response.data.message);
      }
    } catch (error) {
      console.error("Error updating availability", error);
    }
  };

  return (
    <Container>
      <div className="menu">
        <Menu2 />
      </div>

      <ButtonContainer isAvailable={isAvailable}>
        <button onClick={handleAvailabilityToggle}>
          {isAvailable ? 'Go Offline' : 'Go Online'}
        </button>
      </ButtonContainer>

      <HelperDetails>
        <h1>Helper Details</h1>
        <p><strong>Name:</strong> {helper.userName}</p>
        <p><strong>Age:</strong> {helper.age}</p>
        <p><strong>Gender:</strong> {helper.gender}</p>
        <p><strong>Language:</strong> {helper.language}</p>
        <p><strong>Email:</strong> {helper.mail}</p>
        <p><strong>Mobile:</strong> {helper.mobile}</p>
        <p><strong>Interests:</strong> {helper.interests?.join(', ')}</p>
        <p><strong>Availability:</strong> {helper.availablity ? 'Available' : 'Not Available'}</p>
        <p><strong>Call Count:</strong> {helper.callCount}</p>
        <p><strong>Coins:</strong> {helper.coins}🪙</p>
        <p><strong>Ratings:</strong> {helper.ratings !== undefined ? helper.ratings.toFixed(1) : 'N/A'}</p>
        <p><strong>Role:</strong> {helper.role}</p>
      </HelperDetails>
    </Container>
  );
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  background-color: #f0f8f5;

  .menu {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;

  button {
    background-color: ${(props) => (props.isAvailable ? '#28a745' : '#dc3545')};
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => (props.isAvailable ? '#218838' : '#c82333')};
    }
  }
`;

const HelperDetails = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  h1 {
    color: #28a745;
    text-align: center;
  }

  p {
    font-size: 16px;
    line-height: 1.6;

    strong {
      color: #28a745;
    }
  }
`;

export default Helper;
