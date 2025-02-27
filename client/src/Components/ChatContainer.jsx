import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io'
import api from '../Api/Api'
import profile from '../img/profile.svg';

const ChatContainer = ({currentChat,currentUser,setCurrentChat,socket}) => {
    const [msg,setMsg] = useState('')
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)

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
    
    const handleSendMsg =async(e)=>{
        if(msg!==''){
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
  background-color: #7e57c2;
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
    background-color: #9575cd;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
      background-color: #673ab7;
    }
  }
`;

const Container = styled.div`
    height: 85vh;
    width: 100%;
    display: grid;
    grid-template-rows: 8% 87% 4%;
    color: white;
    border: 1px solid #7e57c2;
    border-radius: 0 1rem 1rem 0;
    background: linear-gradient(135deg, #7e57c2, #ede7f6);
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #673ab7;
        border-radius: 0 1rem 1rem 0;
        padding: 1rem;
        .chatUser{
            display: flex;
            align-items: center;
            gap: 1rem;
            img{
                width: 3rem;
                border:2.5px solid #7e57c2;
                border-radius: 50%;
            }
        }
    }
    .messages{
        overflow-y: scroll;
        background-color: #f3e5f5;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #7e57c2;
                border-radius: 1rem;
            }
        }
        .chats{
            display: flex;
            flex-direction: column;
            gap: 10px;
            .message{
                display: flex;
                p{
                    max-width: 40%;
                    padding: 0.6rem 1rem;
                    font-size: 1.1rem;
                    border-radius: 1rem;
                }
            }
            .sended p {
                background-color: #7e57c2;
            }
            .recieved p {
                background-color: #9575cd;
            }
        }
    }
    .chat-sender{
        form{
            display: flex;
            justify-content: space-between;
            width: 100%;
            background-color: #673ab7;
            border-radius: 2rem;
            padding: 0.5rem;
            input{
                width: 90%;
                background-color: inherit;
                color: white;
                font-size: 1rem;
            }
            button{
                cursor: pointer;
                color: white;
                font-size: 1rem;
            }
        }
    }
`
export default ChatContainer
