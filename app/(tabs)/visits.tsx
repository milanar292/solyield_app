import * as Calendar from "expo-calendar";
import * as Location from "expo-location";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";

// 👨‍🔧 Technician
const technician = { name: "Arjun Menon" };

// 🌞 Sites
const sites = [
  {
    id: "SITE001",
    name: "Bhadla Solar Park",
    latitude: 27.5362,
    longitude: 71.9167,
  },
  {
    id: "SITE002",
    name: "Pavagada Solar Park",
    latitude: 14.1666,
    longitude: 77.4333,
  },
  {
    id: "SITE003",
    name: "Kurnool Ultra Mega Solar Park",
    latitude: 15.6815,
    longitude: 78.1516,
  },
];

// 📅 Visits
const initialVisits = [
  {
    id: "VISIT001",
    siteId: "SITE001",
    date: "2026-02-23",
    time: "10:00",
    status: "Upcoming",
    checkInTime: null,
  },
  {
    id: "VISIT002",
    siteId: "SITE002",
    date: "2026-02-23",
    time: "14:00",
    status: "Upcoming",
    checkInTime: null,
  },
  {
    id: "VISIT003",
    siteId: "SITE003",
    date: "2026-02-23",
    time: "17:00",
    status: "Upcoming",
    checkInTime: null,
  },
];

// 📊 Chart data
const generationData = [
  { value: 120, label: "Mon" },
  { value: 150, label: "Tue" },
  { value: 180, label: "Wed" },
  { value: 90, label: "Thu" },
  { value: 200, label: "Fri" },
];

// 📏 Distance helper
const distanceMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function VisitsScreen() {
  const [visits, setVisits] = useState(initialVisits);

  const getSite = (id) => sites.find((s) => s.id === id);

  // 📍 Check-In
  const handleCheckIn = async (visit) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const location = await Location.getCurrentPositionAsync({});
    const site = getSite(visit.siteId);

    const dist = distanceMeters(
      location.coords.latitude,
      location.coords.longitude,
      site.latitude,
      site.longitude,
    );

    if (dist > 500) {
      Alert.alert("Too far from site");
      return;
    }

    setVisits((prev) =>
      prev.map((v) =>
        v.id === visit.id
          ? {
              ...v,
              status: "Completed",
              checkInTime: new Date().toLocaleString(),
            }
          : v,
      ),
    );

    Alert.alert("Check-in successful");
  };

  // 📆 Calendar
  const addToCalendar = async (visit) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") return;

    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT,
    );
    const cal = calendars[0];
    const site = getSite(visit.siteId);

    await Calendar.createEventAsync(cal.id, {
      title: site.name,
      startDate: new Date(`${visit.date}T${visit.time}`),
      endDate: new Date(`${visit.date}T${visit.time}`),
      notes: "Solar site visit",
    });

    Alert.alert("Added to calendar");
  };

  // 📄 PDF Report (TASK 1.4)
  const generateReport = async () => {
    const completed = visits.filter((v) => v.status === "Completed");

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px">
          <h1>Visit Report</h1>
          <h3>Technician: ${technician.name}</h3>
          ${completed
            .map((v) => {
              const site = getSite(v.siteId);
              return `
                <p><b>${site.name}</b></p>
                <p>Date: ${v.date} ${v.time}</p>
                <p>Check-in: ${v.checkInTime}</p>
                <hr/>
              `;
            })
            .join("")}
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "#0f172a", padding: 16 }}
      data={visits}
      keyExtractor={(i) => i.id}
      ListHeaderComponent={
        <>
          <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
            Field Operations Dashboard
          </Text>

          <TouchableOpacity
            onPress={generateReport}
            style={{
              backgroundColor: "#3b82f6",
              padding: 12,
              borderRadius: 10,
              marginVertical: 15,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Generate Visit Report 📄
            </Text>
          </TouchableOpacity>

          <Text style={{ color: "white" }}>Daily Generation</Text>
          <BarChart data={generationData} barWidth={22} />

          <Text style={{ color: "white", marginTop: 20 }}>
            Performance Overview
          </Text>
          <PieChart
            data={[
              {
                value: visits.filter((v) => v.status === "Completed").length,
                color: "#22c55e",
                text: "Done",
              },
              {
                value: visits.filter((v) => v.status !== "Completed").length,
                color: "#f97316",
                text: "Pending",
              },
            ]}
            showText
          />
        </>
      }
      renderItem={({ item }) => {
        const site = getSite(item.siteId);
        return (
          <View
            style={{
              backgroundColor: "#1e293b",
              padding: 15,
              borderRadius: 12,
              marginTop: 15,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {site.name}
            </Text>
            <Text style={{ color: "#94a3b8" }}>
              {item.date} | {item.time}
            </Text>
            <Text style={{ color: "#22c55e" }}>{item.status}</Text>

            {item.status !== "Completed" && (
              <TouchableOpacity onPress={() => handleCheckIn(item)}>
                <Text style={{ color: "#22c55e", marginTop: 6 }}>
                  I’m Here (Check-In)
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => addToCalendar(item)}>
              <Text style={{ color: "#3b82f6", marginTop: 6 }}>
                Add to Calendar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&destination=${site.latitude},${site.longitude}`,
                )
              }
            >
              <Text style={{ color: "#facc15", marginTop: 6 }}>
                Navigate 🧭
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}
