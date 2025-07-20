import React, { useEffect, useState } from "react";

const MissionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:1900/api/drones/logs");
        const result = await response.json();

    if (Array.isArray(result)) {
        setLogs(result);
      } else {
        setError("Unexpected data format.");
      }
    } catch (fetchError) {
      console.error("Fetch error:", fetchError); 
      setError(fetchError.message);
    }
  };

    fetchLogs();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>📄 Mission Logs</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <pre style={{ backgroundColor: "#f6f6f6", padding: "10px", borderRadius: "8px" }}>
        {logs.length > 0 ? JSON.stringify(logs, null, 2) : "No logs found."}
      </pre>
    </div>
  );
};

export default MissionLogs;
