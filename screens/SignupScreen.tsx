import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Logo from "../assets/svg/logo.svg";
import { AppDispatch } from "../state/store";
import { useDispatch } from "react-redux";
import { setToken, signup, setCurrentUser } from "../state/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import HistoryScreen from "./HistoryScreen";

export default function SignupScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      // Perform signup logic here
      const response = await dispatch(signup({ username: username, email: email, password: password }));
      console.log("Signing up with username:", username, "email:", email, "and password:", password);

      //Extract the user data from the response
      const user = response.payload;
      console.log("User signed up:", user);

      // Simulate token creation (replace this with actual token from your API response)
      const token = "temporarytoken123";

      // Store the token in SecureStore
      await SecureStore.setItemAsync("token", token);
      console.log("Token created and stored:", token);

      // Dispatch the token to the Redux store
      dispatch(setToken(token));

      //Dispatch the user to the Redux store
      dispatch(setCurrentUser(user));

      // Clear input fields
      setUsername("");
      setEmail("");
      setPassword("");

      // Show confirmation message
      Alert.alert("Signup Successful", "You have successfully signed up!", [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]);
    } catch (error) {
      console.error("Signup failed:", error);
      Alert.alert("Signup Failed", "An error occurred during signup. Please try again later.");
    }
  };

  useEffect(() => {
    async function load() {
      const token = await SecureStore.getItemAsync("token");
      console.log("read token from SecureStore", token);

      dispatch(setToken(token || ""));
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Logo width={160} height={80} />
      <Text style={styles.subHeader}>Sign up</Text>
      <TextInput style={styles.input} placeholder="Full name" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Enter password" secureTextEntry value={password} onChangeText={setPassword} />
      {/* <TextInput
        style={styles.input}
        placeholder="Repeat password"
        secureTextEntry
      />    */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>Already a customer? Log in</Text>
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
});
