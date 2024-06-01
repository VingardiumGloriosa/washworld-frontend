import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/svg/logo.svg";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { login, setToken } from "../state/slices/userSlice";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.users.token);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  // Update the button's disabled state based on email and password values
  useEffect(() => {
    setIsButtonDisabled(!(email && password));
  }, [email, password]);

  //LOGIN FUNCTIONALITY
  const handleLogin = async () => {
    try {
      dispatch(login({ email, password }));

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
      if (token) {
        dispatch(setToken(token));
      }
    }
    readFromSecureStore();
  }, []);

  return (
    <View style={styles.container}>
      <Logo width={160} height={80} />
      <Text style={styles.subHeader}>Log in</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isButtonDisabled}
      >
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
  buttonDisabled: {
    backgroundColor: "#A5A5A5", // A different color to indicate the disabled state
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

