# SolYield Field Companion App 🌞

A React Native mobile app built for the **SolYield Mobile Migration Hackathon — "The Field Technician's Survival Guide"**.

Built for field technicians like Arjun to manage solar farm visits, check in on-site, navigate to locations, and generate reports — all from a mobile device.

---

## 👷 Technician Profile
- **Name**: Arjun Menon
- **Company**: CLIMAI CLEANTECH PVT LTD
- **Participation**: Individual

---

## 🏗️ Architecture & Approach

The app follows a **file-based routing** architecture using Expo Router, with each tab representing a core workflow for the field technician. State is managed locally with React `useState` for Level 1. The app is built mobile-first with offline capability planned for Level 2.

Key design decisions:
- Expo Managed Workflow for rapid development
- `react-native-maps` for native map rendering
- `expo-calendar` for native device calendar sync
- `expo-print` + `expo-sharing` for on-device PDF generation
- Haversine formula for GPS geofencing validation

---

## ✅ Level 1 — "The Connected Technician"

| # | Challenge | Description | Status |
|---|-----------|-------------|--------|
| 1.1 | The Day's Agenda | Google Calendar sync for assigned visits | ✅ Done |
| 1.2 | "I'm Here!" Check-in | GPS geofencing with 500m radius validation | ✅ Done |
| 1.3 | Site Navigation | Native map with pins, callouts & Google Maps navigation | ✅ Done |
| 1.4 | The Report Card | PDF report with bar chart & performance table | ✅ Done |

---

## 🛠️ Tech Stack

| Category | Library |
|----------|---------|
| Language | TypeScript (Strict Mode) |
| Framework | React Native (Expo Managed Workflow) |
| Navigation | Expo Router (file-based) |
| Maps | react-native-maps |
| Charts | react-native-gifted-charts |
| PDF | expo-print + expo-sharing |
| Calendar | expo-calendar |
| Location | expo-location |

---

## 📱 Screens

- **Home** — Dashboard with today's visit stats and quick actions
- **Visits** — Field operations: check-in, calendar sync, map view, PDF report
- **Map** — Native map with site pins, callouts and Google Maps navigation
- **Sites** — List of all assigned solar farm sites

---

## 📸 Screenshots
| Home | Visits | Map | PDF |
|------|--------|-----|-----|

![home](https://github.com/user-attachments/assets/131ca20f-4f43-47e9-a64d-045fe96f7c90)
![sites](https://github.com/user-attachments/assets/4f2e12c8-f03f-4956-ba1b-06d969900380)
![maps](https://github.com/user-attachments/assets/d0f2ce62-e82c-4bf9-8723-07c4ee8005e1)
![pdf](https://github.com/user-attachments/assets/0550a533-74f3-4e64-8476-2a109a4b6677)
![visits](https://github.com/user-attachments/![report](https://github.com/user-attachments/assets/18488bec-7082-4c92-a35a-3a1a9c688b6c)
assets/cd523f92-59d8-4dae-ad12-c3836af22886)


## 🎥 Video Walkthrough

| Level | Link |
|-------|------|
| Level 1 — Calendar → Site Visit → Check-in (Success/Fail) | [Watch here]|

https://github.com/user-attachments/assets/6e15de5e-874f-46c0-9834-79e8c2ac9410




Scan the QR code with **Expo Go** on your Android or iOS device.

---

## 📁 Project Structure
```
app/
├── (tabs)/
│   ├── _layout.tsx    # Tab navigator
│   ├── index.tsx      # Home dashboard
│   ├── visits.tsx     # Field operations
│   ├── maps.tsx       # Site map
│   └── sites.tsx      # Sites list
components/            # Reusable UI components
constants/             # Theme, colors, fonts
hooks/                 # Custom hooks
assets/
└── screenshots/       # App screenshots for README
```

---

## 🌿 Branching Strategy

| Branch | Purpose |
|--------|---------|
| `level-1` | Level 1 complete submission |
| `level-2` | Level 2 offline features *(in progress)* |
| `main` | Final merged submission |
