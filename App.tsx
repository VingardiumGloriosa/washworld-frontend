import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HistoryScreen";
import HallScreen from "./screens/HallScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HallsIcon from "./assets/svg/halls.svg";
import HistoryIcon from "./assets/svg/history.svg";
import NotificationIcon from "./assets/svg/notification.svg";
import ProfileIcon from "./assets/svg/profile.svg";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        // Keep the splash screen visible while fetching resources
        await SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.otf"),
          "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.otf"),
          "Gilroy-ExtraBold": require("./assets/fonts/Gilroy-ExtraBold.otf"),
          "Gilroy-Heavy": require("./assets/fonts/Gilroy-Heavy.otf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // After loading fonts, hide the splash screen
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndData();
  }, []);

  if (!fontsLoaded) {
    // Return null or an empty View to render nothing while loading
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            let iconColor = focused ? "#34B566" : "gray";

            if (route.name === "History") {
              IconComponent = HistoryIcon;
            } else if (route.name === "Wash Halls") {
              IconComponent = HallsIcon;
            } else if (route.name === "Notifications") {
              IconComponent = NotificationIcon;
            } else if (route.name === "Profile") {
              IconComponent = ProfileIcon;
            }

            return (
              <IconComponent fill={iconColor} width={size} height={size} />
            );
          },
          tabBarActiveTintColor: "#34B566",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Gilroy-Medium",
          },
          tabBarStyle: {
            backgroundColor: "#E6E7E9",
            paddingBottom: 15,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="History" component={HomeScreen} />
        <Tab.Screen name="Wash Halls" component={HallScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
