import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  fetchUserProfile,
  logout,
  updateUserPhoto,
} from "../state/slices/userSlice";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const loading = useSelector((state: RootState) => state.users.loading);

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    console.log("pickImage function triggered");
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("ImagePicker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log("Reading image as base64 from URI:", uri);

        const base64Image = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (base64Image) {
          const formattedBase64Image = `data:image/jpeg;base64,${base64Image}`;
          setImage(formattedBase64Image);
          console.log("Base64 Image:", formattedBase64Image);
          dispatch(updateUserPhoto(formattedBase64Image));
        } else {
          console.error("Failed to convert image to base64");
        }
      } else {
        console.log("Image picking was canceled or no assets found");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Profile Picture",
      "Choose an option",
      [
        {
          text: "Upload Photo",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = () => {
    console.log("Logging out");
    dispatch(logout());
  };

  useEffect(() => {
    console.log("Checking currentUser in useEffect", currentUser);
    if (!currentUser?.email) {
      console.log("Fetching user profile...");
      dispatch(fetchUserProfile());
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
        <View style={styles.profileImageContainer}>
          <Image
            source={
              image
                ? { uri: image }
                : currentUser.photo
                ? { uri: currentUser.photo }
                : require("../assets/images/profile-pic.png")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={showAlert}
          >
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {currentUser ? (
          <Text style={styles.userName}>{currentUser?.fullName}</Text>
        ) : (
          <Text style={styles.userName}>Loading...</Text>
        )}
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#34B566" }]}
          onPress={() => navigation.navigate("MyMemberships")}
        >
          <Text style={styles.buttonText}>My Memberships</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MyCars")}
        >
          <Text style={styles.buttonText}>My Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#57585A" }]}
          onPress={handleLogout}
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
  profileImageContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    padding: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Gilroy-ExtraBold",
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
