import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const EmergencyButton = forwardRef((props, ref) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const savedContacts = await AsyncStorage.getItem("contacts");
      if (savedContacts) setContacts(JSON.parse(savedContacts));
    };
    loadContacts();
  }, []);

  const getLocationMessage = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required to send alerts.");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const mapsLink = `https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;
    return `🚨 Emergency Alert!\nI need help.\nMy location: ${mapsLink}`;
  };

  // 📩 SMS Alert
  const sendSMSAlert = async () => {
    const message = await getLocationMessage();
    if (!message) return;

    const numbers = contacts.map((c) => c.number).join(",");
    const smsUrl = `sms:${numbers}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl);
  };

  // 🟢 WhatsApp Alert
  const sendWhatsAppAlert = async () => {
    const message = await getLocationMessage();
    if (!message) return;

    contacts.forEach((c) => {
      const url = `whatsapp://send?phone=+91${c.number}&text=${encodeURIComponent(message)}`;
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) Alert.alert("WhatsApp not installed");
        else Linking.openURL(url);
      });
    });
  };

  // 🚨 Choose Alert Method Pop-up
  const chooseAlertMethod = () => {
    if (contacts.length === 0) {
      Alert.alert("No Contacts", "Please add emergency contacts first.");
      return;
    }

    Alert.alert(
      "Send Alert Via",
      "Choose a communication method:",
      [
        { text: "SMS", onPress: sendSMSAlert },
        { text: "WhatsApp", onPress: sendWhatsAppAlert },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  // 🔁 Expose function to trigger emergency (Used by Shake)
  useImperativeHandle(ref, () => ({
    activateEmergency: () => chooseAlertMethod(),
  }));

  return (
    <TouchableOpacity style={styles.button} onPress={chooseAlertMethod}>
      <Text style={styles.text}>🚨 EMERGENCY</Text>
    </TouchableOpacity>
  );
});

export default EmergencyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e63946",
    paddingVertical: 25,
    paddingHorizontal: 45,
    borderRadius: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    marginVertical: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1,
  },
});
