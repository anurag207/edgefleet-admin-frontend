
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'; 

function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to EdgeFleet.AI Admin Panel</h1>
      <p className={styles.description}>
        This is a drone monitoring dashboard for managing live feeds, vitals, and missions.
      </p>
      <button className={styles.button} onClick={() => navigate("/admin")}>
        Go to Admin Panel
      </button>
    </div>
    </div>
  );
}

export default Home;
