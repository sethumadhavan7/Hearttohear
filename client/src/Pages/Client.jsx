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
      setUser(JSON.parse(localStorage.getItem('Mental-App')));
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
      <FaStar key={index} color={index < rating ? '#FFD700' : '#e4e5e9'} />
    ));
  };

  return (
    <Container>
      <h1>Suggested Helpers</h1>
      <div className="menu">
        <Menu />
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
              <Stars>{renderStars(helper.ratings)}</Stars>
            </HelperInfo>
          </HelperBox>
        ))}
      </HelperList>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: linear-gradient(to bottom, #8A2BE2, #FFFFFF);
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
    color: #fff;
    background-color: #8A2BE2;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

const HelperList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const HelperBox = styled.li`
  background: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 20px;
  width: 220px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
  }

  img {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
`;

const HelperInfo = styled.div`
  text-align: center;
  h2 {
    margin: 10px 0;
    color: #8A2BE2;
  }
  p {
    margin: 5px 0;
    color: #6A1B9A;
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export default Client;
