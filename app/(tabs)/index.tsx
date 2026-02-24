import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#1f172a",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Arjun's Field Companion 🚀
      </Text>
    </View>
  );
}
