import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DroneDetails() {
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

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Monitoring Drone: {drone.name}</h2>
      <ul>
        <li> Live image stream </li>
        <li>Current vitals: temperature, battery, signal (mock)</li>
        <li>Global controls: Pause Mission, Return to Base</li>
      </ul>
      <button onClick={() => navigate("/admin")} style={{ marginTop: "20px" }}>
        ⬅ Back to Drone List
      </button>
    </div>
  );
}

export default DroneDetails;
