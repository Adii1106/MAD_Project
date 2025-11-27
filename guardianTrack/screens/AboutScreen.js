import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About GuardianTrack</Text>

      <Text style={styles.text}>
        GuardianTrack is a personal safety application designed to help users
        instantly share their live location with trusted contacts during emergencies.
        With SOS alerts, WhatsApp/SMS integration, and shake-to-trigger support,
        GuardianTrack aims to enhance safety for students, women, travelers,
        and senior citizens.
      </Text>

      <Text style={styles.sectionTitle}>Developer</Text>
      <Text style={styles.text}>Aditya Mishra</Text>

      <Text style={styles.sectionTitle}>Version</Text>
      <Text style={styles.text}>v1.0.0</Text>

      <Text style={styles.sectionTitle}>Contact</Text>
      <TouchableOpacity onPress={() => Linking.openURL("mailto:aditya@example.com")}>
        <Text style={[styles.text, styles.link]}>aditya@example.com</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        © 2025 GuardianTrack. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#f9f9f9" },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 22,
    color: "#444",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 5,
  },

  link: {
    color: "#1e90ff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  footer: {
    marginTop: 40,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
});
