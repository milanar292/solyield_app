# 🌞 SolYield Field Companion App

> A resilient mobile solution for field technicians — designed to work **anytime, anywhere**, even with unreliable connectivity.

Built for the **SolYield Mobile Migration Hackathon — "The Field Technician's Survival Guide"**, this app enables technicians to manage site visits, perform check-ins, navigate locations, and generate reports seamlessly from a mobile device.

---

## 👷 Technician Profile
- **Name**: Arjun Menon  
- **Company**: CLIMAI CLEANTECH PVT LTD  
- **Participation**: Individual  

---

## 🧠 Core Concept

Field technicians frequently operate in remote areas where internet access is unstable or unavailable.

This application follows an **offline-first design approach**, ensuring:
- 📴 Continued operation without network dependency  
- 💾 Local data persistence using SQLite  
- 🔄 Seamless synchronization when connectivity is restored  

---

## 🏗️ Architecture & Approach

The app is built using a **modular, mobile-first architecture** with Expo Router.

### Key Design Decisions
- ⚡ Expo Managed Workflow for rapid and efficient development  
- 🗺️ `react-native-maps` for native map rendering  
- 📅 `expo-calendar` for scheduling and visit tracking  
- 📄 `expo-print` + `expo-sharing` for PDF report generation  
- 📍 Haversine formula for GPS-based geofencing validation  
- 💾 SQLite for offline data storage (Level 2)  
- 🔄 Lightweight sync mechanism for data upload on reconnection  

---

## 🚀 Features

### ✅ Level 1 — The Connected Technician

| Feature | Description |
|--------|------------|
| 📅 Calendar Integration | View and manage assigned visits |
| 📍 GPS Check-in | Validate technician presence within 500m radius |
| 🗺️ Site Navigation | Interactive map with directions |
| 📄 Report Generation | Generate structured PDF reports |

---

### 🚀 Level 2 — The Resilient Technician

| Feature | Description |
|--------|------------|
| ✈️ Offline Capability | Core features accessible without internet |
| 📝 Form Handling | Maintenance data can be entered anytime |
| 💾 Local Storage | Data stored securely using SQLite |
| 🔄 Sync Logic | Data prepared for upload once connectivity returns |

---

## 📱 Application Screens

- **Home** — Overview dashboard with daily insights  
- **Visits** — Core workflow: check-in, reporting, and operations  
- **Map** — Site visualization and navigation  
- **Sites** — List of assigned solar farm locations  

---

## 📸 Screenshots

### 🏠 Home Dashboard
![Home](https://github.com/user-attachments/assets/131ca20f-4f43-47e9-a64d-045fe96f7c90)
LEVEL 2-<img width="476" height="1039" alt="Screenshot 2026-03-17 195735" src="https://github.com/user-attachments/assets/b72c710a-1711-444e-b7a3-a4e18e05ac6f" />

### 📍 Sites & Field Operations
![Sites](https://github.com/user-attachments/assets/4f2e12c8-f0 ![WhatsApp Image 2026-03-17 at 4 49 31 PM (2)](https://github.com/user-attachments/assets/8ec234df-563f-416f-889e-3af439fbb339)

### 🗺️ Map Navigation
![Map](https://github.com/user-attachments/assets/d0f2ce62-e82c-4bf9-8723-07c4ee8005e1)

### 📄 Report Generation
![PDF](https://github.com/user-attachments/assets/0550a533-74f3-4e64-8476-2a109a4b6677)

---

## 🎥 Video Walkthrough

### 🔹 Level 1 Demo  
Calendar → Site Visit → GPS Check-in (Success / Fail)  

🔗 https://github.com/user-attachments/assets/6e15de5e-874f-46c0-9834-79e8c2ac9410  

---

### 🔹 Level 2 Demo  
Offline Workflow → Data Entry → Sync Concept  

https://github.com/user-attachments/assets/86faf97f-99b5-4239-84f3-a3c85f07bd2c  

> ⚠️ **Demo Note:**  
> The application is designed with an offline-first architecture using local storage.  
> During the demonstration, network connectivity was available; however, the workflow remains identical in offline conditions, where data is stored locally and prepared for synchronization once connectivity is restored.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Language | TypeScript |
| Framework | React Native (Expo) |
| Navigation | Expo Router |
| Maps | react-native-maps |
| Charts | react-native-gifted-charts |
| Storage | SQLite |
| APIs | Expo Calendar, Location, Print |

---

## 📁 Project Structure


app/
├── (tabs)/
│ ├── index.tsx # Dashboard
│ ├── visits.tsx # Field operations
│ ├── maps.tsx # Map view
│ └── sites.tsx # Site list

hooks/
├── useSyncEngine.js # Sync logic

src/
├── database/ # SQLite handling
├── components/ # UI components
├── utils/ # Helper functions


---

## 🌿 Branching Strategy

| Branch | Purpose |
|--------|--------|
| `level-1` | Core functionality implementation |
| `level-2` | Offline and data persistence features |
| `main` | Final integrated submission |

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/milanar292/solyield_app.git
cd solyield_app
npm install
npx expo start
