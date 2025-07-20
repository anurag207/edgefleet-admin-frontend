# 🚀 EdgeFleet.AI – Admin Panel (Frontend)

A responsive and real-time admin dashboard built using **React + Vite** for monitoring and controlling autonomous drones. This interface connects with the backend to stream live image feeds, monitor vitals, trigger global commands, and view mission logs.


## 🛠️ Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Frontend     | React, Vite                |
| Styling      | CSS Modules (`*.module.css`) |
| State/Storage| Local Storage (auth)       |
| Routing      | React Router v6            |
| Realtime     | Socket.IO (for image feed) |
| API Calls    | REST API (fetch)           |



## ⚙️ Setup Instructions

 1. Clone the Repository

```bash
git clone https://github.com/yourusername/edgefleet-admin-frontend
cd edgefleet-admin-frontend

2. Install Dependencies
bash
npm install

3. Start Development Server
npm run dev

🧱 Project Structure
src/
├── Components/
│   ├── Home/                      # Homepage with CTA
│   ├── DroneFeed.jsx              # Live image stream (Socket.IO)
│   ├── DroneVitals.jsx            # Vitals feed (Polling)
│   ├── MissionLogs.jsx            # Command logs viewer
│   ├── Login.jsx                  # Admin login form
│   └── Login.module.css           # Scoped styles for login
├── utils/
│   └── authCheck.js               # Role-based auth check (admin)
├── AdminPanel.jsx                 # Lists active drones
├── AdminPanel.module.css         # Styles for Admin Panel
├── DroneDetails.jsx              # View + control individual drone
├── ProtectedRoute.jsx            # Route guard for admin-only pages
├── App.jsx                       # All routes + protected routes
└── Home.module.css / App.css     # Layout + UI styling


Architecture & Flow

| Route        | Description                               |
| ------------ | ----------------------------------------- |
| `/`          | Homepage with CTA to Admin Panel          |
| `/login`     | Admin login screen                        |
| `/admin`     | Protected route to list all active drones |
| `/admin/:id` | Detailed view of a specific drone         |
| `/logs`      | View mission logs for all drones          |


🔐 Authentication Flow
Users login via /login using email + password.
On successful login, user info (role, etc.) is stored in localStorage.
authCheck.js provides isAdmin() to validate admin role.
ProtectedRoute.jsx blocks non-admin users from accessing /admin routes.

📡 Drone Monitoring Flow
Admin Panel (/admin)
Fetches list of active drones using:


GET /api/drones
Clicking a drone navigates to /admin/:id.

Drone Details (/admin/:id)
Uses two components:

DroneFeed.jsx

Uses Socket.IO to receive real-time image stream

More efficient than polling

DroneVitals.jsx

Uses polling every 3s to display live temperature, battery, signal

⚙️ Global Controls
Two buttons: Pause Mission and Return to Base

On confirmation, it calls:

POST /api/drones/:id/command { action }
Updates stored drone actions in backend (JSON-based persistence)

🧾 Mission Logs (/logs)
Fetches command logs with timestamps and drone position

Displays data fetched from:
GET /api/drones/actions

🎯 Design Decisions
✅ Socket.IO was used for image streaming to reduce load vs. polling.

✅ Polling is acceptable for vitals due to simplicity and minor size.

✅ Used localStorage for persistent session and role-based access.

✅ Clean component folder structure for scalability.

✅ Styling is scoped using CSS Modules to avoid global leakage.

✅ Project bootstrapped with Vite for fast HMR and dev experience.

  Features :
Role-based admin authentication

Live drone image stream (real-time via WebSocket)

Drone vitals tracking (polling)

Global control buttons with confirmation

Mission logs page with timestamp and geolocation

Protected routes using ProtectedRoute and authCheck.js


🚀 Future Improvements
Replace polling for vitals with WebSockets

Migrate to JWT-based secure auth

Add map view for drone position using Leaflet.js or Google Maps

Enhance UI with component libraries (e.g., Chakra UI, MUI)

Add real database integration for auth and logs


