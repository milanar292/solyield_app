import * as Calendar from "expo-calendar";
import * as Location from "expo-location";
import * as Print from "expo-print";
import { useRouter } from "expo-router";
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

const technician = { name: "Arjun Menon" };

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

const initialVisits = [
  {
    id: "VISIT001",
    siteId: "SITE001",
    date: "2026-02-23",
    time: "10:00",
    status: "Upcoming",
    checkInTime: null as string | null,
  },
  {
    id: "VISIT002",
    siteId: "SITE002",
    date: "2026-02-23",
    time: "14:00",
    status: "Upcoming",
    checkInTime: null as string | null,
  },
  {
    id: "VISIT003",
    siteId: "SITE003",
    date: "2026-02-23",
    time: "17:00",
    status: "Upcoming",
    checkInTime: null as string | null,
  },
];

const generationData = [
  { value: 120, label: "Mon" },
  { value: 150, label: "Tue" },
  { value: 180, label: "Wed" },
  { value: 90, label: "Thu" },
  { value: 200, label: "Fri" },
];

const distanceMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371e3;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function VisitsScreen() {
  const [visits, setVisits] = useState(initialVisits);
  const router = useRouter();

  const getSite = (id: string) => sites.find((s) => s.id === id)!;

  const handleCheckIn = async (visit: (typeof initialVisits)[0]) => {
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
      Alert.alert(
        "❌ Too Far",
        "You must be within 500m of the site to check in.",
      );
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
    Alert.alert(
      "✅ Check-in Successful",
      `Checked in at ${new Date().toLocaleString()}`,
    );
  };

  const addToCalendar = async (visit: (typeof initialVisits)[0]) => {
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

    Alert.alert("📅 Added to Calendar");
  };

  const generateReport = async () => {
    const completed = visits.filter((v) => v.status === "Completed");

    const barChartHTML = generationData
      .map(
        (d) =>
          `<div style="display:inline-block; margin: 4px; text-align:center">
        <div style="width:30px; height:${d.value / 2}px; background:#3b82f6; margin:auto"></div>
        <div style="font-size:11px; color:#555">${d.label}</div>
        <div style="font-size:11px">${d.value}</div>
      </div>`,
      )
      .join("");

    const doneCount = completed.length;
    const pendingCount = visits.length - doneCount;
    const total = visits.length;
    const donePct = Math.round((doneCount / total) * 100);
    const pendingPct = 100 - donePct;

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px; color: #1e293b">
          <h1 style="color:#3b82f6">🌞 SolYield Visit Report</h1>
          <h3>Technician: ${technician.name}</h3>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <hr/>

          <h2>Daily Generation (kWh)</h2>
          <div style="display:flex; align-items:flex-end; height:120px; border-bottom:1px solid #ccc; padding-bottom:8px">
            ${barChartHTML}
          </div>

          <h2>Performance Overview</h2>
          <table style="border-collapse:collapse; width:200px">
            <tr>
              <td style="padding:6px; background:#22c55e; color:white; border-radius:4px">✅ Completed</td>
              <td style="padding:6px">${doneCount} (${donePct}%)</td>
            </tr>
            <tr>
              <td style="padding:6px; background:#f97316; color:white; border-radius:4px">⏳ Pending</td>
              <td style="padding:6px">${pendingCount} (${pendingPct}%)</td>
            </tr>
          </table>

          <h2>Visit Details</h2>
          ${
            completed.length === 0
              ? "<p style='color:#f97316'>No completed visits yet.</p>"
              : completed
                  .map((v) => {
                    const site = getSite(v.siteId);
                    return `
                  <div style="border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:12px">
                    <b>${site.name}</b>
                    <p>Date: ${v.date} at ${v.time}</p>
                    <p>Check-in Time: ${v.checkInTime}</p>
                  </div>
                `;
                  })
                  .join("")
          }
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
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 40,
            }}
          >
            Field Operations 🔧
          </Text>
          <Text style={{ color: "#94a3b8", marginBottom: 16 }}>
            {new Date().toDateString()}
          </Text>

          <TouchableOpacity
            onPress={generateReport}
            style={{
              backgroundColor: "#3b82f6",
              padding: 12,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ color: "white", textAlign: "center", fontWeight: "600" }}
            >
              Generate Visit Report 📄
            </Text>
          </TouchableOpacity>

          <Text style={{ color: "white", fontWeight: "600", marginBottom: 8 }}>
            Daily Generation (kWh)
          </Text>
          <BarChart
            data={generationData}
            barWidth={22}
            barBorderRadius={4}
            frontColor="#3b82f6"
          />

          <Text
            style={{
              color: "white",
              fontWeight: "600",
              marginTop: 20,
              marginBottom: 8,
            }}
          >
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

          <Text
            style={{
              color: "white",
              fontWeight: "600",
              marginTop: 20,
              marginBottom: 4,
            }}
          >
            Today's Visits
          </Text>
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
              marginTop: 12,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
              {site.name}
            </Text>
            <Text style={{ color: "#94a3b8", marginTop: 2 }}>
              {item.date} | {item.time}
            </Text>
            <Text
              style={{
                color: item.status === "Completed" ? "#22c55e" : "#f97316",
                marginTop: 2,
              }}
            >
              {item.status === "Completed"
                ? `✅ Completed • ${item.checkInTime}`
                : "⏳ Upcoming"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 10,
              }}
            >
              {item.status !== "Completed" && (
                <TouchableOpacity
                  onPress={() => handleCheckIn(item)}
                  style={{
                    backgroundColor: "#22c55e",
                    padding: 8,
                    borderRadius: 8,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    📍 I'm Here
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => addToCalendar(item)}
                style={{
                  backgroundColor: "#1d4ed8",
                  padding: 8,
                  borderRadius: 8,
                  flex: 1,
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 12 }}
                >
                  📅 Calendar
                </Text>
              </TouchableOpacity>

              {/* View on in-app map */}
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/maps",
                    params: { siteId: item.siteId },
                  })
                }
                style={{
                  backgroundColor: "#7c3aed",
                  padding: 8,
                  borderRadius: 8,
                  flex: 1,
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 12 }}
                >
                  🗺️ View Map
                </Text>
              </TouchableOpacity>

              {/* Navigate via Google Maps */}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/dir/?api=1&destination=${site.latitude},${site.longitude}`,
                  )
                }
                style={{
                  backgroundColor: "#b45309",
                  padding: 8,
                  borderRadius: 8,
                  flex: 1,
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 12 }}
                >
                  🧭 Navigate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}
