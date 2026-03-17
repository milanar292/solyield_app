# 🌞 SolYield Field Companion App — Level 2

> A resilient, offline-first mobile solution built for field technicians operating in low-connectivity environments.

This is the **Level 2 submission** for the SolYield Mobile Migration Hackathon, extending the Level 1 application into a **reliable, real-world field companion** with offline capability and data persistence.

---

## 👷 Technician Profile
- **Name**: Arjun Menon  
- **Company**: CLIMAI CLEANTECH PVT LTD  
- **Participation**: Individual  

---

## 🧠 What’s New in Level 2?

Level 2 transforms the application from a connected tool into a **resilient system** that continues to function even when internet connectivity is unavailable.

### 🔥 Key Upgrades
- 📴 Offline-first workflow  
- 💾 Local data storage using SQLite  
- 📝 Form-based data capture without internet  
- 🔄 Sync-ready architecture for future data upload  

---

## 🏗️ Architecture Upgrade

The application now follows an **offline-first architecture**, ensuring uninterrupted usability.

### Key Enhancements
- Local persistence layer using SQLite  
- Separation of UI and data handling  
- Sync mechanism design for restoring data to server  
- Fault-tolerant workflow for field usage  

---

## 🚀 Features

### 🟢 Core Functionalities (From Level 1)

- 📅 Calendar-based visit scheduling  
- 📍 GPS geofencing check-in  
- 🗺️ Interactive map navigation  
- 📄 PDF report generation  

---

### 🔵 Level 2 Enhancements

| Feature | Description |
|--------|------------|
| 📴 Offline Mode | App remains usable without internet |
| 📝 Data Entry | Forms can be filled anytime |
| 💾 Local Storage | Data saved securely on device |
| 🔄 Sync Concept | Data prepared for upload on reconnection |

---

## 📱 Application Screens (Level 2 Context)

### 🏠 Home Dashboard
<img width="476" height="1039" alt="Screenshot 2026-03-17 195735" src="https://github.com/user-attachments/assets/4f1939fd-0170-4a23-8026-21f9a75a27b4" />

> Provides quick access to daily operations, designed to function regardless of connectivity status.

---

### 📝 Field Operations (Offline-Ready)
![Visits](https://github.com/user-attachments/assets/34c654f7-e1ce-473f-b046-9dd2158a21bc)

> Maintenance forms can be filled and stored locally, ensuring uninterrupted workflow in remote locations.

---

### 🗺️ Site Navigation
![Map](https://github.com/user-attachments/assets/d0f2ce62-e82c-4bf9-8723-07c4ee8005e1)

> Site data can be accessed and used for navigation, supporting continued field operations.

---

### 📄 Report Generation
![PDF](https://github.com/user-attachments/assets/0550a533-74f3-4e64-8476-2a109a4b6677)

> Reports are generated from locally stored data and can be shared when connectivity is restored.

---

## 🎥 Video Walkthrough

### 🔹 Level 2 Demo  
Offline Workflow → Data Entry → Sync Concept  

https://github.com/user-attachments/assets/dbe0f7f9-50dd-4b40-b75d-5a63ec0b4c31




> ⚠️ **Demo Note:**  
> The application is designed with offline-first capability using local storage.  
> The workflow demonstrated remains consistent in offline scenarios, where data is stored locally and synchronized once connectivity is restored.

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
│ ├── index.tsx
│ ├── visits.tsx
│ ├── maps.tsx
│ └── sites.tsx

hooks/
├── useSyncEngine.js

src/
├── database/
├── components/
├── utils/


---

## 🌿 Branch


level-2


---

## ⚙️ Setup

```bash
git clone https://github.com/milanar292/solyield_app.git
cd solyield_app
npm install
npx expo start
