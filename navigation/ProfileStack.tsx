import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import MyMembershipsScreen from "../screens/MyMembershipsScreen";
import MyCarsScreen from "../screens/MyCarsScreen";
import CameraScreen from "../screens/CameraScreen";

const ProfileStackNavigator = createStackNavigator();

function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNavigator.Screen
        name="PofileMain"
        component={ProfileScreen}
      />
      <ProfileStackNavigator.Screen
        name="MyMemberships"
        component={MyMembershipsScreen}
      />
      <ProfileStackNavigator.Screen name="MyCars" component={MyCarsScreen} />
      <ProfileStackNavigator.Screen name="Camera" component={CameraScreen} />
    </ProfileStackNavigator.Navigator>
  );
}
export default ProfileStack;
