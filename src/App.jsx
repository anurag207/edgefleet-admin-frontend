import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import DroneDetails from "./DroneDetails";
import MissionLogs from './Components/MissionLogs';
import Login from './Components/Login';
import ProtectedRoute from './ProtectedRoute';
import Home from './Components/Home/Home';

// function Home() {
//   return <h1>Edgefleet Frontend</h1>;
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:id"
          element={
            <ProtectedRoute>
              <DroneDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/logs" element={<MissionLogs/>} />
      </Routes>
    </Router>
  );
}

export default App;
