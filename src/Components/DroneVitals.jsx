import React, { useState, useEffect } from "react";

const DroneVitals = ({ droneId }) => {
  const [vitals, setVitals] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await fetch(`http://localhost:1900/api/drones/${droneId}/vitals`);

        if (!response.ok) throw new Error("Failed to fetch vitals");

        const data = await response.json();
        setVitals(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVitals();
    const interval = setInterval(fetchVitals, 3000); // Poll every 3s

    return () => clearInterval(interval); //  Cleanup on unmount
  }, [droneId]);

  if (error) return <p>Error: {error}</p>;
  if (!vitals) return <p>Loading vitals...</p>;

  return (
    <div style={{  marginTop: "0px" }}>
      <h3>Drone Vitals</h3>
      <p>🌡 Temperature: <strong>{vitals.temperature}°C</strong></p>
      <p>🔋 Battery: <strong>{vitals.battery}%</strong></p>
      <p>📶 Signal: <strong>{vitals.signal}</strong></p>
      <p style={{ fontSize: "0.85em", color: "#666", marginTop: "8px"  }}>
        Last updated: {new Date(vitals.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default DroneVitals;
