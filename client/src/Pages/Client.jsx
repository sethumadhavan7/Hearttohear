import React, { useEffect, useRef, useState } from 'react';
import profile from '../img/profile.svg';
import Api from '../Api/Api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
      console.log("Response Data: ", response.data);
      if (Array.isArray(response.data.helpers)) {
        setHelpers(response.data.helpers);
        console.log("yes");
      } else {
        setHelpers([]);
        console.log("No");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log("Helpers State: ", helpers);
  }, [helpers]);

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
            </HelperInfo>
          </HelperBox>
        ))}
      </HelperList>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: linear-gradient(to right, #8a2be2, #ffffff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  }
`;

const HelperList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
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
  padding: 20px;
  width: 220px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  img {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 3px solid #8a2be2;
  }
`;

const HelperInfo = styled.div`
  text-align: center;
  h2 {
    margin: 10px 0;
    color: #4b0082;
  }
  p {
    margin: 5px 0;
    color: #6a0dad;
  }
`;

// Styled menu for violet theme
const StyledMenu = styled(Menu)`
  background: #8a2be2 !important;
  color: #ffffff !important;
  border-radius: 8px;
  padding: 10px;
`;

export default Client;
