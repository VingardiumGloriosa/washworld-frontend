import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const LoginSignupStackNavigator = createStackNavigator();

function LoginSignupStack() {
  return (
    <LoginSignupStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <LoginSignupStackNavigator.Screen name="LoginScreen" component={LoginScreen} />
      <LoginSignupStackNavigator.Screen name="SignupScreen" component={SignupScreen} />
    </LoginSignupStackNavigator.Navigator>
  );
}
export default LoginSignupStack;