import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Logo from "../assets/svg/logo.svg";
import { useDispatch } from "react-redux";
import { loginAsync } from "../state/slices/userSlice"; // Assuming the file path is correct
import LoginSignupStack from "../components/LoginSignupStack";
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  YourScreen: { id: number } | undefined;
};

export default function Login( ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const navigation = useNavigation();


  const handleLogin = async () => {
    try {
      // Dispatch the loginAsync thunk action creator with user credentials
      await loginAsync({ email, password });

      // If login is successful, you can navigate the user to another screen or perform any other action
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
      // Handle login failure, e.g., display an error message to the user
    }
  };
  

  return (
    <View style={styles.container}>
      <Logo width={160} height={80} />
      <Text style={styles.subHeader}>Log in</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

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
