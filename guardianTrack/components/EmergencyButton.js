import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function EmergencyButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
