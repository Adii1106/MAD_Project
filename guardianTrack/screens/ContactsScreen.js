import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContactsScreen() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

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
      Alert.alert("Missing Info", "Please enter both name and number.");
      return;
    }

    let updatedContacts = [...contacts];

    if (editingIndex !== null) {
      updatedContacts[editingIndex] = { name: name.trim(), number: number.trim() };
      setEditingIndex(null);
      Alert.alert("Updated", "Contact updated successfully.");
    } else {
      updatedContacts.push({ name: name.trim(), number: number.trim() });
      Alert.alert("Saved", "Contact saved successfully.");
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

  const deleteContact = (index) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedContacts = contacts.filter((_, i) => i !== index);
            setContacts(updatedContacts);
            try {
              await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
            } catch (error) {
              console.error("Error deleting contact", error);
            }
          },
        },
      ]
    );
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

      <TouchableOpacity style={styles.saveBtn} onPress={saveContact}>
        <Text style={styles.saveBtnText}>
          {editingIndex !== null ? "Update Contact" : "Save Contact"}
        </Text>
      </TouchableOpacity>

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
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  saveBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  saveBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  contactContainer: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contact: { fontSize: 16 },
  buttons: { flexDirection: "row" },
  editBtn: { backgroundColor: "orange", padding: 8, marginRight: 5, borderRadius: 8 },
  deleteBtn: { backgroundColor: "red", padding: 8, borderRadius: 8 },
  btnText: { color: "white", fontWeight: "bold" },
});
