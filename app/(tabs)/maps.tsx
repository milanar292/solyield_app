import { useLocalSearchParams } from "expo-router";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

const sites = [
  {
    id: "SITE001",
    name: "Bhadla Solar Park",
    latitude: 27.5362,
    longitude: 71.9167,
    capacity: "2245 MW",
  },
  {
    id: "SITE002",
    name: "Pavagada Solar Park",
    latitude: 14.1666,
    longitude: 77.4333,
    capacity: "2050 MW",
  },
  {
    id: "SITE003",
    name: "Kurnool Ultra Mega Solar Park",
    latitude: 15.6815,
    longitude: 78.1516,
    capacity: "1000 MW",
  },
];

export default function SiteNavigationScreen() {
  const { siteId } = useLocalSearchParams();
  const focusedSite = sites.find((s) => s.id === siteId) || sites[0];

  const openGoogleMaps = (lat: number, lng: number, name: string) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${name}`,
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <Text
        style={{ color: "white", fontSize: 18, fontWeight: "600", padding: 16 }}
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
            coordinate={{ latitude: site.latitude, longitude: site.longitude }}
            pinColor={site.id === siteId ? "green" : "red"}
          >
            {/* ✅ Callout with site details + Navigate button */}
            <Callout tooltip>
              <View
                style={{
                  backgroundColor: "#1e293b",
                  padding: 12,
                  borderRadius: 10,
                  width: 200,
                  borderWidth: 1,
                  borderColor: "#334155",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 14 }}
                >
                  {site.name}
                </Text>
                <Text style={{ color: "#22c55e", fontSize: 12, marginTop: 4 }}>
                  Capacity: {site.capacity}
                </Text>
                <Text style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>
                  {site.latitude}, {site.longitude}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    openGoogleMaps(site.latitude, site.longitude, site.name)
                  }
                  style={{
                    backgroundColor: "#3b82f6",
                    padding: 8,
                    borderRadius: 6,
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    Navigate 🧭
                  </Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
