import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import EmergencyButton from "../components/EmergencyButton";

export default function HomeScreen() {
  const handleEmergencyPress = () => {
    Alert.alert("Emergency!", "Location shared with contacts 🚨");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GuardianTrack</Text>
      <EmergencyButton onPress={handleEmergencyPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
