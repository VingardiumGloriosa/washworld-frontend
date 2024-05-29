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

/* export type RootStackParamList = {
  YourScreen: { id: number } | undefined;
}; */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.users.token);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  /* 

  useEffect(() => {
    async function readFromSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        dispatch(setToken(token));
      }
    }
    readFromSecureStore();
  }, [dispatch]);

  // Add the test useEffect here
  useEffect(() => {
    async function testSecureStore() {
      try {
        await SecureStore.setItemAsync("test_key", "test_value");
        const storedValue = await SecureStore.getItemAsync("test_key");
        console.log("Stored test value:", storedValue); // Should log "test_value"
      } catch (error) {
        console.error("SecureStore test failed:", error);
      }
    }

    testSecureStore();
  }, []);

  const handleLogin = async () => {
    try {
      // Perform login logic here
      const response = await dispatch(login({ email, password })).unwrap();
      console.log("Logging in with email:", email, "and password:", password);

      const { token, user } = response;

      console.log("Token type:", typeof token); // Check the type of the token
      console.log("Token value:", token); // Log the token value

      if (typeof token !== "string") {
        throw new Error("Invalid token");
      }

      // Store the token in SecureStore
      await SecureStore.setItemAsync("token", token);
      console.log("Token created and stored:", token);

      // Dispatch the token to the Redux store
      dispatch(setToken(token));
      dispatch(setCurrentUser(user));

      // Clear input fields
      setEmail("");
      setPassword("");

      // Navigate to the desired screen
      navigation.navigate("History");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.message || "Invalid email or password");
    }
  };
 */

  //TRYING TO IMPLEMENT THE LOGIN FUNCTIONALITY

  const handleLogin = async () => {
    try {
      dispatch(login({ email: email, password: password }));

      // Clear input fields
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.message || "Invalid email or password");
    }
  };

  useEffect(() => {
    async function readFromSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      token && dispatch(setToken(token));
    }
    readFromSecureStore();
  }, []);

  return (
    <View style={styles.container}>
      <Logo width={160} height={80} />
      <Text style={styles.subHeader}>Log in</Text>
      <Text>{token}</Text>

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
