import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../assets/svg/leftArrow.svg";
import CarIcon from "../assets/svg/car.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCarAsync, fetchCarsAsync } from "../state/slices/carsSlice";
import { RootState } from "../state/store";

// Placeholder function to get user ID from session
const getUserID = () => {
  // Replace this with the actual logic to get user ID from your authentication system
  return "12345"; // Example user ID
};

const MyCarsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.cars.cars);

  const [modalVisible, setModalVisible] = useState(false);
  const [carImageLink, setCarImageLink] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const userID = getUserID();

  useEffect(() => {
    dispatch(fetchCarsAsync());
  }, [dispatch]);

  const handleAddCar = () => {
    console.log("add car function");
    console.log("Car Image Link:", carImageLink, "License Plate:", licensePlate, "User ID:", userID);

    const newCar = {
      id: cars.length + 1, // Temporary ID, should be replaced by backend-generated ID
      user_id: getUserID(),
      licensePlate: licensePlate,
      carImageLink: carImageLink,
    };

    console.log("handleAddCar", newCar);

    dispatch(addCarAsync(newCar));

    setCarImageLink("");
    setLicensePlate("");

    setModalVisible(false);
  };

  const handleCancel = () => {
    // Clear the input fields first
    setCarImageLink("");
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

        {/* Temporary Car List */}
        <View style={styles.carListContainer}>
          {/* Container with Background Color */}
          <View style={styles.carCardContainer}>
            {/* QR Code Image */}
            <Image source={require("../assets/images/qr-code.png")} style={styles.qrCodeImage} />

            {/* Car Image */}
            <Image source={require("../assets/images/toyota.jpg")} style={styles.carImage} />

            {/* License Plate Text */}
            <Text style={styles.licensePlate}>License Plate: ABC123</Text>
          </View>

          <View style={styles.carCardContainer}>
            {/* QR Code Image */}
            <Image source={require("../assets/images/qr-code.png")} style={styles.qrCodeImage} />

            {/* Car Image */}
            <Image source={require("../assets/images/toyota.jpg")} style={styles.carImage} />

            {/* License Plate Text */}
            <Text style={styles.licensePlate}>License Plate: ABC123</Text>
          </View>
        </View>

        {/* Dynamic Car List */}
        <View style={styles.carListContainer}>
          {/* Container with Background Color */}
          {cars.map((car, index) => (
            <View key={index} style={styles.carCardContainer}>
              {/* QR Code Image */}
              <Image source={{ uri: car.qrCodeImageLink }} style={styles.qrCodeImage} />

              {/* Car Image */}
              <Image source={{ uri: car.carImageLink }} style={styles.carImage} />

              {/* License Plate Text */}
              <Text style={styles.licensePlate}>License Plate: {car.licensePlate}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add car</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add a New Car</Text>

            {/* Car Image Link Input */}
            <TextInput style={styles.input} placeholder="Car Image Link" value={carImageLink} onChangeText={setCarImageLink} />

            {/* License Plate Input */}
            <TextInput style={styles.input} placeholder="License Plate" value={licensePlate} onChangeText={setLicensePlate} />

            {/* Hidden User ID */}
            <TextInput style={styles.hiddenInput} value={userID} editable={false} />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleAddCar}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
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
  carImage: {
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
    backgroundColor: "#808285", // Default color
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
