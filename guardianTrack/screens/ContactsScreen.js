import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContactsScreen() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [contacts, setContacts] = useState([]);

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

    const newContact = { name: name.trim(), number: number.trim() };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);

    try {
      await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } catch (error) {
      console.error("Error saving contacts", error);
    }

    setName("");
    setNumber("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Emergency Contact</Text>

      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter number"
        value={number}
        onChangeText={(text) => setNumber(text.replace(/[^0-9]/g, ""))} // allow only numbers
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button title="Save Contact" onPress={saveContact} />

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.contact}>
            {item.name} - {item.number}
          </Text>
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
  contact: {
    fontSize: 16,
    padding: 5,
  },
});
