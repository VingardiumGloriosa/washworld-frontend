import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { fetchUserProfile, logout } from "../state/slices/userSlice";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.users.currentUser);
  const loading = useSelector((state: RootState) => state.users.loading);

  const handleLogout = () => {
    console.log("Logging out");
    dispatch(logout());
  };useEffect(() => {
   

   console.log("Checking currentUser in useEffect", currentUser);
    if (!currentUser?.email) {
      console.log("Fetching user profile...");
      dispatch(fetchUserProfile());
      console.log(currentUser)
    }
  }, [dispatch, currentUser]);


  if (loading || !currentUser) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#34B566" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/images/profile-pic.png")} style={styles.profileImage} />
        {currentUser ? (
          <>
            <Text style={styles.userName}>{currentUser?.fullName}</Text>
            {/* <Text style={styles.loyaltyText}>17 loyalty rewards claimed</Text> */}
          </>
        ) : (
          <Text style={styles.userName}>Loading...</Text>
        )}
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#34B566" }]} onPress={() => navigation.navigate("MyMemberships")}>
          <Text style={styles.buttonText}>My Memberships</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyCars")}>
          <Text style={styles.buttonText}>My Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#57585A" }]} onPress={handleLogout}>
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#808285",
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
