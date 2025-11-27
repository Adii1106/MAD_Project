import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";

export default function ContactsScreen() {
  const { darkMode } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("contacts");
      if (saved) setContacts(JSON.parse(saved));
    })();
  }, []);

  const saveContact = async () => {
    if (!name || !number) return alert("Enter name & number!");

    let updated = [...contacts];
    if (editingIndex !== null) updated[editingIndex] = { name, number };
    else updated.push({ name, number });

    setContacts(updated);
    await AsyncStorage.setItem("contacts", JSON.stringify(updated));
    setName("");
    setNumber("");
    setEditingIndex(null);
  };

  const deleteContact = async (i) => {
    const updated = contacts.filter((_, idx) => idx !== i);
    setContacts(updated);
    await AsyncStorage.setItem("contacts", JSON.stringify(updated));
  };

  return (
    <View style={[styles.container, darkMode && styles.darkBg]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Emergency Contacts</Text>

      <TextInput
        placeholder="Enter name"
        placeholderTextColor={darkMode ? "#888" : "#555"}
        value={name}
        onChangeText={setName}
        style={[styles.input, darkMode && styles.darkInput]}
      />

      <TextInput
        placeholder="Enter number"
        placeholderTextColor={darkMode ? "#888" : "#555"}
        keyboardType="phone-pad"
        value={number}
        onChangeText={(t) => setNumber(t.replace(/[^0-9]/g, ""))}
        style={[styles.input, darkMode && styles.darkInput]}
      />

      <Button title={editingIndex !== null ? "Update" : "Save"} onPress={saveContact} color="#e63946" />

      <FlatList
        data={contacts}
        renderItem={({ item, index }) => (
          <View style={[styles.card, darkMode && styles.darkCard]}>
            <Text style={[styles.contact, darkMode && styles.darkText]}>
              {item.name} - {item.number}
            </Text>

            <View style={styles.row}>
              <TouchableOpacity onPress={() => { setEditingIndex(index); setName(item.name); setNumber(item.number); }}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteContact(index)}>
                <Text style={styles.del}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  darkBg: { backgroundColor: "#000" },
  darkInput: { backgroundColor: "#111", color: "#fff", borderColor: "#444" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#000" },
  darkText: { color: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
  darkCard: { backgroundColor: "#111", borderColor: "#333" },
  contact: { fontSize: 16 },
  row: { flexDirection: "row", justifyContent: "flex-end" },
  edit: { marginRight: 15, color: "orange", fontWeight: "bold" },
  del: { color: "red", fontWeight: "bold" },
});
