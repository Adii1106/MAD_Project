import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import * as SMS from "expo-sms";

export default function EmergencyButton() {
  const handlePress = async () => {
    try {
      // Ask for location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required!");
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Google Maps link
      const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const message = `🚨 Emergency! I need help. My location:\n${mapsUrl}`;

      // Check if SMS is available
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        // Send SMS to trusted contacts (dummy numbers for now)
        await SMS.sendSMSAsync(
          ["6206420660"], // replace with real contacts later
          message
        );
      } else {
        Alert.alert("Error", "SMS is not available on this device");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to send emergency message");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>🚨 Emergency</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
