import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ThemeContext } from "../context/ThemeContext";

export default function MapScreen() {
  const { darkMode } = useContext(ThemeContext);
  const [loc, setLoc] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return alert("Enable location for map use!");

      const pos = await Location.getCurrentPositionAsync({});
      setLoc(pos.coords);
    })();
  }, []);

  if (!loc)
    return (
      <View style={[styles.loading, darkMode && styles.darkBg]}>
        <ActivityIndicator size="large" color="#e63946" />
        <Text style={[styles.text, darkMode && styles.darkText]}>
          Fetching location...
        </Text>
      </View>
    );

  return (
    <View style={[styles.container, darkMode && styles.darkBg]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={loc} title="You are here" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkBg: { backgroundColor: "#000" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginTop: 10, color: "#000" },
  darkText: { color: "#fff" },
  map: { flex: 1 },
});
