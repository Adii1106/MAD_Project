import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import EmergencyButton from "../components/EmergencyButton";
import useShake from "../utils/useShake";

export default function HomeScreen() {
  let emergencyRef = React.useRef(null);

  const triggerEmergency = () => {
    Alert.alert(
      "Shake Detected!",
      "Emergency mode activated automatically!",
      [
        {
          text: "Send Alert",
          onPress: () => emergencyRef.current.activateEmergency(),
        }
      ]
    );
  };

  useShake(triggerEmergency);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GuardianTrack</Text>
      <Text style={styles.subText}>Shake the phone 3 times to trigger SOS</Text>
      
      <EmergencyButton ref={emergencyRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  subText: { fontSize: 14, color: "gray", marginBottom: 30 },
});
