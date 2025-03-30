import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi'
import {IoMdSend} from 'react-icons/io'
import api from '../Api/Api'
import profile from '../img/profile.svg';
import { useNavigate } from 'react-router-dom'

const ChatContainer = ({currentChat,currentUser,setCurrentChat,socket}) => {
    const [msg,setMsg] = useState('')
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const navigate = useNavigate();

    const chatContainerRef = useRef(null);
    useEffect(() => {
       scrollToBottom();
     }, [messages]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
       }
    }
    useEffect(()=>{
        const fetchMessages =async()=>{
            if(currentChat){
                try {
                    const response = await api.post('/messages/inbox',{
                        from:currentUser._id,
                        to: currentChat._id
                    })
                    setMessages(response.data)
                } catch (error) {
                    console.log(error.message)
                }
            }
        }
        fetchMessages()
    },[currentChat])
    const handleCloseChat = ()=>{
        setCurrentChat(undefined)
    }
    const handleSendMsg =async(e)=>{
        if(msg!==""){
            try {
                let message = msg
                setMessages([...messages,{fromSelf:true,message:message}])
                e.preventDefault()
                setMsg("")
                if(currentChat){
                    socket.current.emit("send-msg",{
                        "to":currentChat._id,
                        "message" : message
                    })
                }
                
                await api.post('/messages',{
                    from: currentUser._id,
                    to: currentChat._id,
                    message: message
                })
        } catch (error) {
            console.log(error.message)
        }
        }  
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg})
                
            })
        }
    },[socket])
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage])
    const renderMessageContent = (message) => {
        const urlPattern = /https:\/\/hearttohear-frontend.onrender.com\/#\/test\/\?roomID=\w+/;
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
                <img src={profile} alt="" />
                <h3>{currentChat.userName}</h3>
            </div>
            <div className="logout">
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
                <input type='text' placeholder='Type to send message...' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button type='submit'><IoMdSend/></button>
            </form>
        </div>
    </Container>
  )
}

const CallLinkContainer = styled.div`
  background-color: #8a2be2; /* Violet */
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
    background-color: #9932cc; /* Darker violet */
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: #8a2be2;
    }
  }
`;

const Container = styled.div`
    height: 85vh;
    width: 100%;
    display: grid;
    grid-template-rows: 8% 87% 5%;
    color: white;
    border: 1px solid #8a2be2;
    border-radius: 0 1rem 1rem 0;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.1);
    
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #8a2be2;
        border-radius: 0 1rem 0 0;
        padding: 1rem;
        
        .chatUser{
            display: flex;
            justify-content: left;
            align-items: center;
            gap: 1rem;
            img{
                width: 3rem;
                border: 2.5px solid #9932cc;
                border-radius: 50%;
            }
            h3 {
                color: white;
            }
        }
        .logout{
            cursor: pointer;
            color: white;
        }
    }
    
    .messages{
        overflow-y: scroll;
        background-color: #ffffff;
        padding: 0.5rem;
        
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #8a2be2;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        
        .chats{
            display: flex;
            gap: 10px;
            flex-direction: column;
            width: 100%;
            
            .message{
                display: flex;
                p{
                    overflow-wrap: break-word;
                    max-width: 40%;
                    padding: 0.6rem 1rem;
                    font-size: 1.1rem;
                    border-radius: 1rem;
                    color: white;
                }
            }
            
            .sended{
                justify-content: flex-end;
                p{
                    background-color: #8a2be2;
                }
            }
            
            .recieved{
                justify-content: flex-start;
                p{
                    background-color: #ba8fe6;
                }
            }
        }
    }
    
    .chat-sender{
        width: 100%;
        display: flex;
        align-items: center;
        height: 100%;
        background-color: #f5f0ff;
        border-radius: 0 0 1rem 1rem;
        
        form{
            display: flex;
            justify-content: space-between;
            width: 100%;
            background-color: #8a2be2;
            border-radius: 2rem;
            margin: 0 1rem;
            padding: 0.5rem 1rem;
            
            input{
                width: 90%;
                outline: none;
                border: none;
                background-color: transparent;
                color: white;
                font-size: 1rem;
                &::placeholder {
                    color: #e6d5ff;
                }
            }
            
            button{
                cursor: pointer;
                color: white;
                border: none;
                outline: none;
                background-color: transparent;
                font-size: 1.2rem;
                transition: transform 0.2s ease;
                
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
`
export default ChatContainer
