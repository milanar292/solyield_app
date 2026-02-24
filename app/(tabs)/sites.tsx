import { FlatList, StyleSheet, Text, View } from "react-native";

export const sites = [
  {
    id: "site_01",
    name: "Bhadla Solar Park",
    location: { lat: 27.5362, lng: 71.9167 },
    capacity: "2245 MW",
  },
  {
    id: "site_02",
    name: "Pavagada Solar Park",
    location: { lat: 14.1666, lng: 77.4333 },
    capacity: "2050 MW",
  },
  {
    id: "site_03",
    name: "Kurnool Ultra Mega Solar Park",
    location: { lat: 15.6815, lng: 78.1516 },
    capacity: "1000 MW",
  },
];

export default function SitesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ Solar Sites</Text>

      <FlatList
        data={sites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.capacity}>Capacity: {item.capacity}</Text>
            <Text style={styles.location}>
              Lat: {item.location.lat} | Lng: {item.location.lng}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  capacity: {
    color: "#22c55e",
    marginTop: 5,
  },
  location: {
    color: "#94a3b8",
    marginTop: 5,
    fontSize: 12,
  },
});
