import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const quickStats = [
  { label: "Today's Visits", value: "3", color: "#3b82f6" },
  { label: "Completed", value: "1", color: "#22c55e" },
  { label: "Pending", value: "2", color: "#f97316" },
];

const quickActions = [
  { label: "📅 My Schedule", route: "/(tabs)/visits", color: "#1e40af" },
  { label: "🗺️ Site Map", route: "/(tabs)/sites", color: "#065f46" },
  { label: "📄 Generate Report", route: "/(tabs)/visits", color: "#7c3aed" },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header */}
      <Text style={{ color: "#94a3b8", fontSize: 14, marginTop: 10 }}>
        Welcome back,
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        Arjun Menon 👷
      </Text>
      <Text style={{ color: "#94a3b8", fontSize: 13, marginBottom: 24 }}>
        {new Date().toDateString()}
      </Text>

      {/* Stats Row */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 24 }}>
        {quickStats.map((stat) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              backgroundColor: "#1e293b",
              borderRadius: 12,
              padding: 14,
              alignItems: "center",
              borderTopWidth: 3,
              borderTopColor: stat.color,
            }}
          >
            <Text
              style={{ color: stat.color, fontSize: 24, fontWeight: "bold" }}
            >
              {stat.value}
            </Text>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 11,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        Quick Actions
      </Text>
      {quickActions.map((action) => (
        <TouchableOpacity
          key={action.label}
          onPress={() => router.push(action.route as any)}
          style={{
            backgroundColor: action.color,
            padding: 16,
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
            {action.label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Status Banner */}
      <View
        style={{
          backgroundColor: "#022c22",
          borderRadius: 12,
          padding: 16,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>🟢</Text>
        <View>
          <Text style={{ color: "#22c55e", fontWeight: "600" }}>Online</Text>
          <Text style={{ color: "#94a3b8", fontSize: 12 }}>
            All data synced
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
