import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
       
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
  );
}

export default App;
