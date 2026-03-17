import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Component, useEffect } from "react";
import { Text, View } from "react-native";
import { database } from "../src/database";

SplashScreen.preventAutoHideAsync();

class ErrorBoundary extends Component {
  state = { error: null };
  componentDidCatch(error) {
    this.setState({ error });
  }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, backgroundColor: "black", padding: 40 }}>
          <Text style={{ color: "red", fontSize: 16 }}>
            {this.state.error.toString()}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <DatabaseProvider database={database}>
        <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </View>
      </DatabaseProvider>
    </ErrorBoundary>
  );
}
