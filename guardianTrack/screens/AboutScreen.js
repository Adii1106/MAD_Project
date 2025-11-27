import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function AboutScreen() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, darkMode && styles.darkBg]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>
        About GuardianTrack
      </Text>

      <Text style={[styles.text, darkMode && styles.darkText]}>
        GuardianTrack is a personal safety application designed to help users
        instantly alert trusted contacts during emergencies with live location
        sharing, shake triggers, WhatsApp & SMS alerts.
      </Text>

      <Text style={[styles.footer, darkMode && styles.darkText]}>
        Developed by Aditya Mishra {"\n"}© 2025 GuardianTrack
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  darkBg: { backgroundColor: "#000" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#000" },
  text: { fontSize: 16, textAlign: "center", color: "#444", marginBottom: 30 },
  footer: { textAlign: "center", color: "#999", fontSize: 14 },
  darkText: { color: "#fff" },
});
