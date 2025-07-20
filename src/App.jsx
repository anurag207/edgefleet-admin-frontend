import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import DroneDetails from "./DroneDetails";

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
      </Routes>
    </Router>
  );
}

export default App;
