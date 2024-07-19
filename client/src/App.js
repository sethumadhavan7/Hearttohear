import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Client from './Pages/Client';
import Helper from './Pages/Helper';

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/client" element={<Client/>}/>
          <Route path="/helper" element={<Helper/>}/>
       
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
  );
}

export default App;
