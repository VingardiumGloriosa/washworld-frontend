import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoryScreen from "./screens/HistoryScreen";
import NotificationScreen from "./screens/NotificationScreen";
import HistoryIcon from "./assets/svg/history.svg";
import HallsIcon from "./assets/svg/halls.svg";
import NotificationIcon from "./assets/svg/notification.svg";
import ProfileIcon from "./assets/svg/profile.svg";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import HallStack from "./navigation/HallStack";
/* import CarStack from "./navigation/CarStack"; */
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import { Provider } from "react-redux";
import { store } from "./state/store";
import ProfileStack from "./navigation/ProfileStack";
import { checkAuthentication } from "./state/slices/userSlice";
import LoginSignupStack from "./navigation/LoginSignupStack";
import { useAppDispatch, useAppSelector } from "./state/hooks";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.users.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginSignupStack />;
  }

  return (
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
          return <IconComponent fill={iconColor} width={size} height={size} />;
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
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Wash Halls" component={HallStack} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.otf"),
          "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.otf"),
          "Gilroy-ExtraBold": require("./assets/fonts/Gilroy-ExtraBold.otf"),
          "Gilroy-Heavy": require("./assets/fonts/Gilroy-Heavy.otf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
