import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/hall.jpeg")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Carrie Washington</Text>
        <Text style={styles.loyaltyText}>17 loyalty rewards claimed</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#34B566" }]}
        >
          <Text style={styles.buttonText}>My Memberships</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>My Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#57585A" }]}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Gilroy-ExtraBold",
  },
  loyaltyText: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
    fontFamily: "Gilroy-Regular",
  },
  menu: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#808285", // Default color
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
  },
});

export default ProfileScreen;
