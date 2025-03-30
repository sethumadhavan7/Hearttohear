import React, { useEffect, useRef, useState } from 'react';
import profile from '../img/profile.svg';
import Api from '../Api/Api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { io } from 'socket.io-client';
import Menu from '../Components/Menu';

const Client = ({ setUser, setChat }) => {
  const [helpers, setHelpers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    if (!localStorage.getItem('Mental-App')) {
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem('Mental-App')));
      setUser(JSON.parse(localStorage.getItem('Mental-App')))
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("https://hearttohear-2.onrender.com");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetch = async () => {
      let user = JSON.parse(localStorage.getItem('Mental-App'));
      const response = await Api.post('/user/helpers', { language: user.language });
      if (Array.isArray(response.data.helpers)) {
        setHelpers(response.data.helpers);
      } else {
        setHelpers([]);
      }
    };
    fetch();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        color={index < rating ? '#FFD700' : '#e4e5e9'} 
        size={18}
      />
    ));
  };

  return (
    <Container>
      <h1>Suggested Helpers</h1>
      <div className="menu">
        <StyledMenu />
      </div>
      <HelperList>
        {helpers && helpers.map((helper) => (
          <HelperBox key={helper._id} onClick={() => {
            setChat(helper);
            navigate(`/priv-chat/`);
          }}>
            <img src={profile} alt="profile" />
            <HelperInfo>
              <h2>{helper.userName}</h2>
              <p>Age: {helper.age}</p>
              <p>Language: {helper.language}</p>
              <Stars>
                {renderStars(helper.ratings || 0)}
                <RatingText>({helper.ratings || 0}/5)</RatingText>
              </Stars>
            </HelperInfo>
          </HelperBox>
        ))}
      </HelperList>
    </Container>
  );
};

// Styles (updated with violet theme and star ratings)
const Container = styled.div`
  padding: 20px;
  background: linear-gradient(to right, #8a2be2, #ffffff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  h1 {
    text-align: center;
    color: #ffffff;
    background: #4b0082;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 2rem;
  }
`;

const HelperList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  max-width: 1200px;
`;

const HelperBox = styled.li`
  background: #ffffff;
  border: 2px solid #8a2be2;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 25px;
  width: 220px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  img {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    margin-bottom: 15px;
    border: 3px solid #8a2be2;
    object-fit: cover;
  }
`;

const HelperInfo = styled.div`
  text-align: center;
  width: 100%;
  h2 {
    margin: 10px 0;
    color: #4b0082;
    font-size: 1.2rem;
  }
  p {
    margin: 8px 0;
    color: #6a0dad;
    font-size: 0.9rem;
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  gap: 5px;
`;

const RatingText = styled.span`
  color: #6a0dad;
  font-size: 0.8rem;
  margin-left: 5px;
`;

const StyledMenu = styled(Menu)`
  background: #8a2be2 !important;
  color: #ffffff !important;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

export default Client;
