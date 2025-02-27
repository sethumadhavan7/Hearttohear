import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';
import { IoMdSend } from 'react-icons/io';
import api from '../Api/Api';
import profile from '../img/profile.svg';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const randomID = (len = 5) => {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
};

const getUrlParams = (url = window.location.href) => {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
};

const OpenChat = ({ Chats, User, socket }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [callUrlGenerated, setCallUrlGenerated] = useState(false);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const generateCallUrl = async () => {
      if (!callUrlGenerated) {
        const appID = 1765347933;
        const serverSecret = "6eaea34c8a78c9bdf78b9a7503cc9aaa";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
      
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        const url = `${window.location.protocol}//${window.location.host}/#/test${window.location.pathname}?roomID=${roomID}`;
      
        setMsg(url)
        setCallUrlGenerated(true);
      }
    };
    generateCallUrl();
  }, [callUrlGenerated]);

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
              <p>{message.message}</p>
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

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 8% 88% 4%;
  color: white;
  background-color: #8a2be2;

  .chat-header {
    background-color: #6a0dad;
  }

  .messages {
    background-color: white;
    color: black;
  }

  .chat-sender {
    background-color: #6a0dad;
  }

  form input {
    background-color: white;
    color: black;
  }

  form button {
    color: white;
  }
`;

export default OpenChat;
