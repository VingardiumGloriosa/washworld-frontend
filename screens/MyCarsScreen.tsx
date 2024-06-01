import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../assets/svg/leftArrow.svg";
import CarIcon from "../assets/svg/car.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCar, fetchCars } from "../state/slices/carSlice";
import { RootState } from "../state/store";
import QRCode from "react-native-qrcode-svg";
import * as SecureStore from "expo-secure-store";
import { setToken } from "../state/slices/userSlice";

const MyCarsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.cars.cars);
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const token = useSelector((state: RootState) => state.users.token);

  const userId = currentUser?.id;

  useEffect(() => {
    async function readFromSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      token && dispatch(setToken(token));
    }
    readFromSecureStore();
  }, []);

  useEffect(() => {
    console.log("currentUser:", currentUser);
    console.log("fetching cars for user", userId);
    dispatch(fetchCars());
  }, [dispatch, currentUser]);

  const handleAddCar = async () => {
    try {
      // Generate QR code data
      const qrCodeData = `Car ID: ${cars.length + 1}, User ID: ${userId}, License Plate: ${licensePlate}`;

      const newCar = {
        userId: userId,
        car: {
          userId: userId,
          licensePlate: licensePlate,
          photo: photo,
          qrCodeData: qrCodeData,
        },
      };

      console.log("handleAddCar", "user id:", newCar.car.userId, "license plate:", newCar.car.licensePlate, "photo:", newCar.car.photo.substring(0, 100), "qr code:", newCar.car.qrCodeData);

      dispatch(addCar(newCar));

      setPhoto("");
      setLicensePlate("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error in handleAddCar:", error);
    }
  };

  const openCamera = () => {
    setModalVisible(false);
    navigation.navigate("Camera", {
      onCapture: (imageBase64) => {
        setPhoto(imageBase64);
        setModalVisible(true);
      },
    });
  };

  const handleCancel = () => {
    // Clear the input fields first
    setPhoto("");
    setLicensePlate("");

    // Close the modal after resetting the input fields
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.goBack()}>
          <ArrowIcon width={25} height={25} fill={"#808285"} />
        </TouchableOpacity>

        {/* Title and Car Icon */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Cars</Text>
          <CarIcon width={30} height={30} fill={"black"} />
        </View>

        {/* <Text>token: {token}</Text> */}

        {/* Dynamic Car List */}
        <View style={styles.carListContainer}>
          {/* Container with Background Color */}
          {cars.map((car, index) => (
            <View key={index} style={styles.carCardContainer}>
              {/* QR Code */}
              <QRCode value={car.qrCodeData} size={250} />

              {/* Car Image */}
              <Image source={{ uri: `${car.photo}` }} style={styles.photo} />
              {/* License Plate Text */}
              <Text style={styles.licensePlate}>License Plate: {car.licensePlate}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add car</Text>
      </TouchableOpacity>
      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add a New Car</Text>
            {/* License Plate Input */}
            <TextInput style={styles.input} placeholder="License Plate" value={licensePlate} onChangeText={setLicensePlate} />

            {/* Hidden User ID */}
            <TextInput style={styles.hiddenInput} value={`${userId}`} editable={false} />

            <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
              <Text style={styles.cameraButtonText}>Take photo of car</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleAddCar}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  arrowContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: "#F2F3F4",
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  title: {
    fontFamily: "Gilroy-Heavy",
    fontSize: 20,
  },
  carListContainer: {
    flexDirection: "column",
    gap: 20,
  },
  carCardContainer: {
    backgroundColor: "#F2F3F4",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  qrCodeImage: {
    width: 250,
    height: 250,
  },
  photo: {
    width: 250,
    height: 150,
    marginTop: 20,
    marginBottom: 10,
  },
  licensePlate: {
    fontFamily: "Gilroy-Heavy",
    fontSize: 20,
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
    marginTop: 20,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontFamily: "Gilroy-Heavy",
    fontSize: 20,
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: "#808285",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
    width: "100%",
  },
  cameraButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
  },
  input: {
    borderWidth: 1,
    borderColor: "#808285",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  hiddenInput: {
    display: "none",
  },
  submitButton: {
    backgroundColor: "#808285",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
    width: "100%",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
  },
  cancelButton: {
    backgroundColor: "#F2F3F4",
    color: "#808285",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 20,
    width: "100%",
  },
  cancelButtonText: {
    color: "#808285",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
  },
});

export default MyCarsScreen;
