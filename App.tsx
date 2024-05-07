import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HistoryScreen";
import HallScreen from "./screens/HallScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HallsIcon from "./assets/svg/halls.svg";
import HistoryIcon from "./assets/svg/history.svg";
import NotificationIcon from "./assets/svg/notification.svg";
import ProfileIcon from "./assets/svg/profile.svg";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;

            if (route.name === "History") {
              IconComponent = HistoryIcon;
            } else if (route.name === "Wash Halls") {
              IconComponent = HallsIcon;
            } else if (route.name === "Notifications") {
              IconComponent = NotificationIcon;
            } else if (route.name === "Profile") {
              IconComponent = ProfileIcon;
            }

            return <IconComponent color={color} width={size} height={size} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: "#ffffff",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
