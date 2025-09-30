import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function EmergencyButton() {
  const [contacts, setContacts] = useState([]);

  // Load contacts when button mounts
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const savedContacts = await AsyncStorage.getItem("contacts");
        if (savedContacts) {
          setContacts(JSON.parse(savedContacts));
        }
      } catch (error) {
        console.error("Error loading contacts:", error);
      }
    };

    loadContacts();
  }, []);

  // Handle emergency alert
  const sendAlert = async () => {
    if (contacts.length === 0) {
      Alert.alert("No contacts", "Please add emergency contacts first.");
      return;
    }

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const mapsLink = `https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;
      const message = `🚨 Emergency Alert! I need help. My location: ${mapsLink}`;

      const numbers = contacts.map((c) => c.number).join(",");
      const smsUrl = `sms:${numbers}?body=${encodeURIComponent(message)}`;

      Linking.openURL(smsUrl);
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={sendAlert}>
      <Text style={styles.text}>🚨 EMERGENCY 🚨</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e63946", // brighter red
    paddingVertical: 25,
    paddingHorizontal: 50,
    borderRadius: 50, // more rounded
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    elevation: 6, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1,
  },
});
