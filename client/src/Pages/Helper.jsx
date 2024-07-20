import React, { useState, useEffect } from 'react';
import Api from '../Api/Api';
import styled from 'styled-components';
import Menu2 from '../Components/Menu2';
import profile from '../img/profile.svg';

const Helper = () => {
  const [helper, setHelper] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const fetch = async()=>{
      const storedUser = JSON.parse(localStorage.getItem("Mental-App"));
      if (storedUser) {
        const response = await Api.get(`/user/det/${storedUser._id}`);
        console.log(response.data)
        localStorage.setItem("Mental-App", JSON.stringify(response.data));
        setHelper(storedUser);
        setIsAvailable(storedUser.availablity);
      }
    }
    fetch()
    
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
        alert("Availability status updated successfully");
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
        <LeftSection>
          <UpperBox>
            <ProfileImg src={profile} alt="Profile" />
            <ProfileInfo>
              <DetailItem><strong>Name:</strong> {helper.userName}</DetailItem>
              <DetailItem><strong>Email:</strong> {helper.mail}</DetailItem>
              <DetailItem><strong>Mobile:</strong> {helper.mobile}</DetailItem>
            </ProfileInfo>
          </UpperBox>

          <RightSection>
            <DetailItem><strong>Age:</strong> {helper.age}</DetailItem>
            <DetailItem><strong>Gender:</strong> {helper.gender}</DetailItem>
            <DetailItem><strong>Language:</strong> {helper.language}</DetailItem>
            <DetailItem><strong>Interests:</strong> {helper.interests?.join(', ')}</DetailItem>
            <DetailItem><strong>Availability:</strong> {helper.availablity ? 'Available' : 'Not Available'}</DetailItem>
            <DetailItem><strong>Role:</strong> {helper.role}</DetailItem>
          </RightSection>
        </LeftSection>

        <LowerBox>
          <DetailItem><strong>Call Count:</strong> {helper.callCount}</DetailItem>
          <DetailItem><strong>Coins:</strong> {helper.coins}🪙</DetailItem>
          <DetailItem><strong>Ratings:</strong> {helper.ratings !== undefined ? helper.ratings.toFixed(1) : 'N/A'}</DetailItem>
        </LowerBox>
      </HelperDetails>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #333;
  padding: 20px;
  position: relative;
  min-height: 100vh;

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
    background-color: ${(props) => (props.isAvailable ? '#4caf50' : '#f44336')};
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: ${(props) => (props.isAvailable ? '#45a049' : '#e53935')};
      transform: scale(1.05);
    }
  }
`;

const HelperDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px;
  border-radius: 15px;
  margin-top: 20px;
  max-width: 1000px;
  margin: 20px auto;
`;

const LeftSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: justify;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const UpperBox = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LowerBox = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-left: 1rem;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const DetailItem = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 10px;

  strong {
    color: #4caf50;
    font-weight: bold;
  }
`;

export default Helper;
