import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPanel.module.css";

function AdminPanel() {
  const [drones, setDrones] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

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

  const handleMonitor = (drone) => {
    navigate(`/admin/${drone.id}`, { state: { drone } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
  <h2 className={styles.heading}>Admin Panel - Active Drones</h2>
  <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th className={styles.monitorColumn}>Monitor</th>
          </tr>
        </thead>
        <tbody>
          {drones.map((drone, index) => (
            <tr key={drone.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td>{drone.id}</td>
              <td>{drone.name}</td>
              <td>{drone.status}</td>
              <td>
                <button
                  className={styles.selectButton}
                  onClick={() => handleMonitor(drone)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminPanel;
