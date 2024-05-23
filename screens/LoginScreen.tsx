import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/svg/logo.svg";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { login, setCurrentUser, setToken } from "../state/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import LoginSignupStack from "../navigation/LoginSignupStack";
import HistoryScreen from "./HistoryScreen";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  YourScreen: { id: number } | undefined;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const token = useSelector((state: RootState) => state.users.token);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    async function readFromSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        dispatch(setToken(token));
      }
    }
    readFromSecureStore();
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(login({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        // Extract the user data from the action payload
        const user = result.payload;
        // Dispatch an action to update the currentUser state in Redux
        dispatch(setCurrentUser(user));
        // Navigate to the desired screen
        // Clear input fields
        setEmail("");
        setPassword("");
        navigation.navigate("History");
      } else {
        Alert.alert("Login Failed", "Invalid email or password");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Logo width={160} height={80} />
      <Text style={styles.subHeader}>Log in</Text>

      <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Enter password" secureTextEntry value={password} onChangeText={setPassword} />

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.loginText}>Not a customer? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginText: {
    color: "#000",
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
});
