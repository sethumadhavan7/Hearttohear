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
          <DetailItem><strong>Tokens:</strong> {helper.tokens}</DetailItem>
          <DetailItem><strong>Ratings:</strong> {helper.ratings !== undefined ? helper.ratings.toFixed(1) : 'N/A'}</DetailItem>
        </LowerBox>
      </HelperDetails>
    </Container>
  );
};

// Updated Styled Components with Violet Theme
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #4b0082; /* Dark violet text */
  padding: 20px;
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f5f0ff, #ffffff);

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
    background-color: ${(props) => (props.isAvailable ? '#8a2be2' : '#6a0dad')}; /* Violet shades */
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(106, 13, 173, 0.3);
    font-weight: 600;

    &:hover {
      background-color: ${(props) => (props.isAvailable ? '#9932cc' : '#4b0082')};
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(106, 13, 173, 0.4);
    }

    &:active {
      transform: translateY(0);
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
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border: 1px solid #e6d5ff;
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
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f5ff;
  box-shadow: 0 8px 16px rgba(138, 43, 226, 0.1);
  border: 1px solid #e6d5ff;
`;

const UpperBox = styled.div`
  background-color: #f9f5ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(138, 43, 226, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #e6d5ff;
`;

const LowerBox = styled.div`
  background-color: #f9f5ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(138, 43, 226, 0.1);
  margin-left: 1rem;
  border: 1px solid #e6d5ff;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(138, 43, 226, 0.2);
  border: 3px solid #8a2be2;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const DetailItem = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #4b0082;

  strong {
    color: #8a2be2;
    font-weight: 600;
  }
`;

export default Helper;
