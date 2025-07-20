// components/DroneFeed.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


const DroneFeed = ({ droneId }) => {
  const [feed, setFeed] = useState(null);
//   const [error, setError] = useState(null); //POLLING LOGIC COMMENTED OUT

//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const response = await fetch(`http://localhost:1900/api/drones/${droneId}/feed`);

//         if (!response.ok) throw new Error('Failed to fetch feed');
//         const data = await response.json();
//         setFeed(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     // Initial fetch
//     fetchFeed();
    
//     // Polling every 3s using setInterval
//     const interval = setInterval(fetchFeed, 3000);
    
//     return () => clearInterval(interval);
//   }, [droneId]);

useEffect(() => { //using socket instead of polling 
    // Connect socket
    const socket = io("http://localhost:1900", {
      transports: ['websocket'],
    });

    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("subscribeToDrone", droneId);
    });

    socket.on("droneFeed", (data) => {
      setFeed(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [droneId]);


//   if (error) return <p>Error: {error}</p>;
  if (!feed) return <p>Loading feed...</p>;

  return (
    <div className="drone-feed">
      <img 
        src={feed.imageBase64} 
        alt={`Drone ${droneId} feed`} 
        style={{ maxWidth: '100%', border: '1px solid #ccc' }}
      />
      <p>Last updated: {new Date(feed.timestamp).toLocaleTimeString()}</p>
    </div>
  );
};

export default DroneFeed;


