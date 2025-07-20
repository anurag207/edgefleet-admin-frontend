import React, { useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";

function AdminPanel() {
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1900/api/drones")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setDrones(data.data.filter((drone) => drone.status === "active"));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch drones:", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Panel - Active Drones</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {drones.map((drone) => (
            <tr key={drone.id}>
              <td>{drone.id}</td>
              <td>{drone.name}</td>
              <td>{drone.status}</td>
              <td>
                <button
                  className={styles.selectButton}
                  onClick={() => setSelectedDrone(drone)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDrone && (
        <div className={styles.selectedDrone}>
          <h3>Selected Drone: {selectedDrone.name}</h3>
          <ul>
            <li>Live image stream</li>
            <li>Current vitals (temperature, battery, signal)</li>
            <li>Controls: Pause mission, Return to base</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
