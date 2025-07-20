import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DroneFeed from './Components/DroneFeed';
import DroneVitals from "./Components/DroneVitals";

function DroneDetails() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
    useEffect(() => {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
      document.body.classList.add('transition-theme');
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
//   const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const drone = state?.drone;

  if (!drone) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Drone data not available.</p>
        <button onClick={() => navigate("/admin")}>Back</button>
      </div>
    );
  }

   //  Function to handle action
   const handleCommand = async (commandName) => {
    const confirmed = window.confirm(`Are you sure you want to ${commandName}?`);
    if (!confirmed) return;

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL +`/api/drones/${drone.id}/command`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: commandName })
      });

      const result = await response.json();
      if (response.ok) {
        alert(`✅ ${commandName === "pause_mission" ? "Drone Paused" : "Returning to Base"} - Status Updated`);
        console.log(result.data); 
      } else {
        alert("❌ Failed to send command");
      }
    } catch (error) {
      alert("❌ Error sending command");
      console.error(error);
    }
  };

  return (
    <div>
        {/*Light/Dark Theme Toggle*/}
        <button onClick={toggleTheme} style={{ position: 'absolute', top: 10, right: 10 }}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Monitoring Drone: {drone.name}</h2>
      <div style={{ margin: '20px 0' }}>
        <h3>Live Feed</h3>
        <DroneFeed droneId={drone.id} /> {/* Image Feed Component */}
      </div>
      
      <hr style={{ margin: '30px 0', borderColor: '#ccc' }} />
        <DroneVitals droneId={drone.id} /> {/* Drone Vitals Component */}
        
<hr style={{ margin: '10px 0', borderColor: '#ccc' }} />
        <div style={{ marginTop: "20px" }}>
        <h3>Global Controls </h3>

        {/*  Pause Mission Button */}
        <button
          onClick={() => handleCommand("pause_mission")}
          style={{  marginRight: "10px",
            padding: "10px 16px",
            backgroundColor: "#ffc107",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"}}
        >
          ⏸ Pause Mission
        </button>

        {/*  Return to Base Button */}
        <button
          onClick={() => handleCommand("return_to_base")}
          style={{
            padding: "10px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🚀 Return to Base
        </button>
      </div>
      <button onClick={() => navigate("/admin")} style={{
      marginTop: "30px",
      padding: "10px 16px",
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    }}>
        ⬅ Back to Drone List
      </button>
    </div>
    </div>
  );
}

export default DroneDetails;
