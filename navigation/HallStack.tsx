import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HallScreen from "../screens/HallScreen";
import MapScreen from "../screens/MapScreen";

const HallStackNavigator = createStackNavigator();

function HallStack() {
  return (
    <HallStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HallStackNavigator.Screen name="HallMain" component={HallScreen} />
      <HallStackNavigator.Screen name="Map" component={MapScreen} />
    </HallStackNavigator.Navigator>
  );
}
export default HallStack;
