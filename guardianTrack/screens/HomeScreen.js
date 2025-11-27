import React, { useContext, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import EmergencyButton from "../components/EmergencyButton";
import useShake from "../utils/useShake";
import { ThemeContext } from "../context/ThemeContext";

export default function HomeScreen() {
  const { darkMode } = useContext(ThemeContext);
  const emergencyRef = useRef(null);

  useShake(() => emergencyRef.current.activateEmergency());

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>GuardianTrack</Text>
      <Text style={[styles.subText, darkMode && styles.darkSubText]}>
        Shake your phone 3 times to activate SOS
      </Text>

      <EmergencyButton ref={emergencyRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  darkContainer: { backgroundColor: "#000" },
  title: { fontSize: 32, fontWeight: "bold", color: "#000" },
  subText: { marginTop: 10, fontSize: 14, color: "#444" },
  darkText: { color: "#fff" },
  darkSubText: { color: "#ccc" },
});
