import React, {
  useState, useEffect, forwardRef, useImperativeHandle, useContext
} from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { ThemeContext } from "../context/ThemeContext";

const EmergencyButton = forwardRef((props, ref) => {
  const { darkMode } = useContext(ThemeContext);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("contacts");
      if (saved) setContacts(JSON.parse(saved));
    })();
  }, []);

  const getMessage = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return null;

    const loc = await Location.getCurrentPositionAsync({});
    return `🚨 Emergency! I need help.\nMy location: https://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`;
  };

  const sendSMS = async () => {
    const msg = await getMessage();
    const nums = contacts.map((c) => c.number).join(",");
    Linking.openURL(`sms:${nums}?body=${encodeURIComponent(msg)}`);
  };

  const sendWA = async () => {
    const msg = await getMessage();
    contacts.forEach((c) => {
      Linking.openURL(`whatsapp://send?phone=+91${c.number}&text=${encodeURIComponent(msg)}`);
    });
  };

  const activate = () => {
    if (!contacts.length) return alert("Add contacts first!");

    Alert.alert("Send Alert", "Choose a method", [
      { text: "SMS", onPress: sendSMS },
      { text: "WhatsApp", onPress: sendWA },
      { text: "Cancel" },
    ]);
  };

  useImperativeHandle(ref, () => ({ activateEmergency: activate }));

  return (
    <TouchableOpacity
      style={[styles.button, darkMode && styles.glow]}
      onPress={activate}
    >
      <Text style={styles.text}>🚨 EMERGENCY</Text>
    </TouchableOpacity>
  );
});

export default EmergencyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e63946",
    paddingVertical: 25,
    paddingHorizontal: 50,
    borderRadius: 50,
    elevation: 5,
  },
  glow: {
    shadowColor: "#e63946",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  text: { color: "#fff", fontWeight: "bold", fontSize: 22 },
});
