import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import EmergencyButton from "../components/EmergencyButton";
import useShake from "../utils/useShake";

export default function HomeScreen({ navigation }) {
  const triggerEmergency = () => {
    Alert.alert(
      "Shake Detected!",
      "Emergency detected automatically! Opening alert options...",
    );
    navigation.navigate("Home");
  };

  useShake(triggerEmergency);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GuardianTrack</Text>
      <Text style={styles.subText}>Shake your phone 3 times to trigger SOS</Text>
      <EmergencyButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  subText: { fontSize: 14, color: "gray", marginBottom: 30 },
});
