import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📞 Emergency Contacts will be managed here!</Text>
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
  text: {
    fontSize: 18,
  },
});
