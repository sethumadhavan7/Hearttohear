import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import api from '../Api/Api';
import profile from '../img/profile.svg';
import { useNavigate } from 'react-router-dom';

const ChatContainer = ({ currentChat, currentUser, setCurrentChat, socket }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        try {
          const response = await api.post('/messages/inbox', {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchMessages();
  }, [currentChat]);

  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (msg !== '') {
      try {
        let message = msg;
        setMessages([...messages, { fromSelf: true, message: message }]);
        setMsg('');
        if (currentChat) {
          socket.current.emit('send-msg', {
            to: currentChat._id,
            message: message,
          });
        }
        await api.post('/messages', {
          from: currentUser._id,
          to: currentChat._id,
          message: message,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const renderMessageContent = (message) => {
    const urlPattern = /https:\/\/hearttohear-frontend\.onrender\.com\/#\/test\/\?roomID=\w+/;
    const isCallLink = urlPattern.test(message.message);

    if (isCallLink) {
      return (
        <CallLinkContainer>
          <button onClick={() => (window.location.href = message.message)}>Join Call</button>
        </CallLinkContainer>
      );
    } else {
      return <p>{message.message}</p>;
    }
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="chatUser">
          <img src={profile} alt="Profile" />
          <h3>{currentChat?.userName}</h3>
        </div>
      </div>
      <div className="messages" ref={chatContainerRef}>
        <div className="chats">
          {messages.map((message, index) => (
            <div key={index} className={message.fromSelf ? 'sended' : 'recieved'}>
              {renderMessageContent(message)}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-sender">
        <form onSubmit={handleSendMsg}>
          <input
            type="text"
            placeholder="Type to send message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </Container>
  );
};

const CallLinkContainer = styled.div`
  background-color: #388e3c;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    background-color: #81c784;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
      background-color: #66bb6a;
    }
  }
`;

const Container = styled.div`
  height: 85vh;
  width: 100%;
  display: grid;
  grid-template-rows: 8% 87% 5%;
  color: white;
  border: 1px solid green;
  border-radius: 0 1rem 1rem 0;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2e7d32;
    padding: 1rem;
    border-radius: 0 1rem 0 0;

    .chatUser {
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        width: 3rem;
        border: 2.5px solid #30a206;
        border-radius: 50%;
      }
    }
  }

  .messages {
    overflow-y: scroll;
    background-color: #ffffff;
    padding: 1rem;

    .chats {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .sended p {
        background-color: #388e3c;
        border-radius: 1rem;
        padding: 0.6rem 1rem;
        max-width: 40%;
      }

      .recieved p {
        background-color: #81c784;
        border-radius: 1rem;
        padding: 0.6rem 1rem;
        max-width: 40%;
      }
    }
  }

  .chat-sender form {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: #4caf50;
    border-radius: 2rem;

    input {
      border: none;
      outline: none;
      background: none;
      color: white;
      width: 90%;
      font-size: 1rem;
    }

    button {
      cursor: pointer;
      background: none;
      border: none;
      color: white;
      font-size: 1rem;
    }
  }
`;

export default ChatContainer;
