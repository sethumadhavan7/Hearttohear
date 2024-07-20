import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';
import { IoMdSend } from 'react-icons/io';
import api from '../Api/Api';
import profile from '../img/profile.svg';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Function to generate a random ID
const randomID = (len = 5) => {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
};

// Function to get URL parameters
const getUrlParams = (url = window.location.href) => {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
};

const OpenChat = ({ Chats, User, socket }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [callUrlGenerated, setCallUrlGenerated] = useState(false); // State variable to track URL generation
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const generateCallUrl = async () => {
      if (!callUrlGenerated) { // Check if URL has already been generated
        const appID = 1868303825;
        const serverSecret = "a8764fe446b6c579fb66f81e14d9e200";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
      
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        const url = `${window.location.protocol}//${window.location.host}/#/test${window.location.pathname}?roomID=${roomID}`;
      
        setMsg(url)
        setCallUrlGenerated(true); // Mark the URL as generated
      }
    };
    generateCallUrl();
  }, [callUrlGenerated]); // Add callUrlGenerated to the dependency array

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
      if (Chats) {
        try {
          const response = await api.post('/messages/inbox', {
            from: User._id,
            to: Chats._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchMessages();
  }, [Chats]);

  const handleCloseChat = () => {
    navigate('/client');
  };

  const handleSendMsg = async (e) => {
    if (msg !== "") {
      try {
        let message = msg;
        setMessages([...messages, { fromSelf: true, message: message }]);
        e.preventDefault();
        setMsg("");
        if (Chats) {
          socket.current.emit("send-msg", {
            to: Chats._id,
            message: message,
          });
        }

        await api.post('/messages', {
          from: User._id,
          to: Chats._id,
          message: message,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // Function to check if a message contains a URL and render accordingly
  const renderMessageContent = (message) => {
    const urlPattern = /http:\/\/localhost:3000\/#\/test\/\?roomID=\w+/;
    const isCallLink = urlPattern.test(message.message);

    if (isCallLink) {
      return (
        <CallLinkContainer>
          <button onClick={() => window.location.href = message.message}>Join Call</button>
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
          <h3>{Chats.userName}</h3>
        </div>
        <div className="logout">
          <BiPowerOff onClick={handleCloseChat} />
        </div>
      </div>
      <div className="messages" ref={chatContainerRef}>
        <div className="chats">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
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

  p {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: white;
  }

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
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 8% 88% 4%;
  color: white;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2e7d32;
    padding: 1rem;

    .chatUser {
      display: flex;
      justify-content: left;
      align-items: center;
      gap: 1rem;

      img {
        width: 3rem;
        border: 2.5px solid #30a206;
        border-radius: 50%;
      }
    }

    .logout {
      cursor: pointer;
      color: white;
    }
  }

  .messages {
    height: 70vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .chats {
      display: flex;
      gap: 10px;
      flex-direction: column;
      width: 100%;

      .message {
        display: flex;

        p {
          overflow-wrap: break-word;
          max-width: 40%;
          padding: 0.6rem 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
        }
      }

      .sended {
        justify-content: flex-end;

        p {
          background-color: #388e3c;
        }
      }

      .recieved {
        justify-content: flex-start;

        p {
          background-color: #81c784;
        }
      }
    }
  }

  .chat-sender {
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;

    form {
      display: flex;
      justify-content: space-between;
      width: 100%;
      background-color: #4caf50;
      border-radius: 2rem;
      color: white;
      padding: 0.5rem;

      input {
        width: 90%;
        outline: none;
        border: none;
        background-color: inherit;
        color: white;
        font-size: 1rem;
      }

      button {
        cursor: pointer;
        color: white;
        border: none;
        outline: none;
        background-color: inherit;
        font-size: 1rem;
      }
    }
  }
`;

export default OpenChat;
