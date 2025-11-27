import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "./context/ThemeContext";

import HomeScreen from "./screens/HomeScreen";
import ContactsScreen from "./screens/ContactsScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AboutScreen from "./screens/AboutScreen";

import ThemeProvider from "./context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: darkMode ? "#111" : "#fff",
            borderTopColor: darkMode ? "#333" : "#e0e0e0",
          },
          tabBarActiveTintColor: "#e63946",
          tabBarInactiveTintColor: darkMode ? "#888" : "#444",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
