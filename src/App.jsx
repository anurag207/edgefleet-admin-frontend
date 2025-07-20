import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import DroneDetails from "./DroneDetails";
import MissionLogs from './Components/MissionLogs';

function Home() {
  return <h1>Edgefleet Frontend</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/:id" element={<DroneDetails />} />
        <Route path="/logs" element={<MissionLogs/>} />
      </Routes>
    </Router>
  );
}

export default App;
