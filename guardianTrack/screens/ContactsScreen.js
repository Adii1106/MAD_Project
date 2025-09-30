import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContactsScreen() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // null means adding new, otherwise editing

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const savedContacts = await AsyncStorage.getItem("contacts");
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
    } catch (error) {
      console.error("Error loading contacts", error);
    }
  };

  const saveContact = async () => {
    if (!name.trim() || !number.trim()) {
      alert("Please enter both name and number.");
      return;
    }

    let updatedContacts = [...contacts];

    if (editingIndex !== null) {
      // Update existing contact
      updatedContacts[editingIndex] = { name: name.trim(), number: number.trim() };
      setEditingIndex(null);
    } else {
      // Add new contact
      updatedContacts.push({ name: name.trim(), number: number.trim() });
    }

    setContacts(updatedContacts);

    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Error saving contacts", error);
    }

    setName("");
    setNumber("");
  };

  const deleteContact = async (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  const editContact = (index) => {
    setName(contacts[index].name);
    setNumber(contacts[index].number);
    setEditingIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter number"
        value={number}
        onChangeText={(text) => setNumber(text.replace(/[^0-9]/g, ""))}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button title={editingIndex !== null ? "Update Contact" : "Save Contact"} onPress={saveContact} />

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.contactContainer}>
            <Text style={styles.contact}>{item.name} - {item.number}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editContact(index)} style={styles.editBtn}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteContact(index)} style={styles.deleteBtn}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  contact: { fontSize: 16 },
  buttons: { flexDirection: "row" },
  editBtn: { backgroundColor: "orange", padding: 5, marginRight: 5, borderRadius: 5 },
  deleteBtn: { backgroundColor: "red", padding: 5, borderRadius: 5 },
  btnText: { color: "white", fontWeight: "bold" },
});
