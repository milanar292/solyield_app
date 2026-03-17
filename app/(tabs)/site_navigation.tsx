import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

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

export default function SiteNavigationScreen() {
  const { siteId } = useLocalSearchParams();

  const focusedSite = sites.find((s) => s.id === siteId) || sites[0];

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "600",
          padding: 16,
        }}
      >
        Site Navigation
      </Text>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: focusedSite.latitude,
          longitude: focusedSite.longitude,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {sites.map((site) => (
          <Marker
            key={site.id}
            coordinate={{
              latitude: site.latitude,
              longitude: site.longitude,
            }}
            title={site.name}
            pinColor={site.id === siteId ? "green" : "red"}
          />
        ))}
      </MapView>
    </View>
  );
}