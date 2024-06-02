import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Logo from "../assets/svg/logo.svg";
import { AppDispatch } from "../state/store";
import { useDispatch } from "react-redux";
import { setToken, signup, setCurrentUser } from "../state/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleSignup = async () => {
    if (isButtonEnabled) {
      try {
        dispatch(signup({ fullName, email, password }));

        // Clear input fields
        setFullName("");
        setEmail("");
        setPassword("");

        // Show confirmation message
        Alert.alert("Signup Successful", "You have successfully signed up! Please log in to access your profile", [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]);
      } catch (error) {
        console.error("Signup failed:", error);
        Alert.alert("Signup Failed", error.message || "An error occurred during signup. Please try again later.");
      }
    }
  };

  useEffect(() => {
    async function load() {
      const token = await SecureStore.getItemAsync("token");
      dispatch(setToken(token || ""));
    }
    load();
  }, []);

  useEffect(() => {
    setIsButtonEnabled(fullName !== "" && email !== "" && password !== "");
  }, [fullName, email, password]);

  return (
    <View style={styles.container}>
      <Logo width={160} height={80} />
      <Text style={styles.subHeader}>Sign up</Text>
      <TextInput style={styles.input} placeholder="Full name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Enter password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={[styles.button, !isButtonEnabled && styles.buttonDisabled]} onPress={handleSignup} disabled={!isButtonEnabled}>
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
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
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
