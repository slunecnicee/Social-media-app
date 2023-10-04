import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Home from './Pages/Home';
import { useContext } from "react";
import {AuthContext} from './context/AuthContext'
import './App.css';
import EditUser from "./components/edit";



function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/profile/:username" element={user? <Profile /> : <Navigate to="/login"/>} />
      <Route path="/edit/" element={user? <EditUser /> :<Navigate to="/login"/>} />
 
 
  </Routes>
  </BrowserRouter>
  );
}

export default App;
