import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Logo from "../assets/svg/logo.svg";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Logo width={160} height={80} />
      <Text style={styles.subHeader}>Sign up</Text>
      <TextInput style={styles.input} placeholder="Full name" />
      <TextInput style={styles.input} placeholder="Enter email" />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
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
