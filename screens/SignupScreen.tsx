import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Logo from "../assets/svg/logo.svg";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setToken, signup } from "../store/userSlice";
import * as SecureStore from "expo-secure-store";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = () => {
    // Perform signup logic here
    dispatch(signup({ username: username, email: email, password: password }));
    console.log("Signing up with username:", username, "email:", email, "and password:", password);
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
      <TouchableOpacity>
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
