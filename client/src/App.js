import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Client from './Pages/Client';
import Helper from './Pages/Helper';
import Chat from './Pages/Chat';
import OpenChat from './Components/OpenChat';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import CallPage from './Pages/CallPage';
import HelperRequest from './Pages/HelperRequest';
import Cryptopages from './Pages/Cryptopages';

function App() {
  const [User, setUser] = useState(undefined);
  const [Chats, setChat] = useState(undefined);
  const socket = useRef();

  // Establish WebSocket connection
  useEffect(() => {
    if (User) {
      socket.current = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3500");
      socket.current.emit("add-user", User._id);

      // WebSocket error handling
      socket.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });
    }
  }, [User]);

  // Private route component for authenticated users
  const PrivateRoute = ({ children }) => {
    return User ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client" element={<Client setUser={setUser} setChat={setChat} />} />
        <Route path="/helper" element={<Helper />} />
        <Route path="/request" element={<HelperRequest setUser={setUser} />} />
        <Route
          path="/chat-page"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/crypto" element={<Cryptopages />} />
        <Route
          path="/test"
          element={
            <PrivateRoute>
              <CallPage Chats={Chats} />
            </PrivateRoute>
          }
        />
        <Route
          path="/priv-chat"
          element={
            <PrivateRoute>
              <OpenChat Chats={Chats} User={User} socket={socket} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
