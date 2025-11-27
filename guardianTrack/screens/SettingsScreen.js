import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";
import * as Application from "expo-application";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const resetContacts = () => {
    Alert.alert("Reset Contacts?", "This cannot be undone!", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("contacts");
          Alert.alert("Done", "Contacts reset successfully!");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkBg]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Settings</Text>

      <View style={styles.row}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.resetBtn} onPress={resetContacts}>
        <Text style={styles.resetTxt}>Reset Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={[styles.aboutTxt, darkMode && styles.darkText]}>About the App</Text>
      </TouchableOpacity>

      <Text style={[styles.version, darkMode && styles.darkText]}>
        Version {Application.nativeApplicationVersion || "1.0.0"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  darkBg: { backgroundColor: "#000" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  darkText: { color: "#fff" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20 },
  label: { fontSize: 18 },
  resetBtn: { marginTop: 30, padding: 12, backgroundColor: "#e63946", borderRadius: 8 },
  resetTxt: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  aboutTxt: { fontSize: 16, textAlign: "center" },
  linkBtn: { marginTop: 20, padding: 12, borderWidth: 1, borderRadius: 8, borderColor: "#aaa" },
  version: { marginTop: 40, textAlign: "center", color: "#777" },
});
