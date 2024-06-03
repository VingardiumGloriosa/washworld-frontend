import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../assets/svg/leftArrow.svg";
import CarIcon from "../assets/svg/car.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCar, fetchCars, deleteCar } from "../state/slices/carSlice";
import { RootState } from "../state/store";
import QRCode from "react-native-qrcode-svg";
import * as SecureStore from "expo-secure-store";
import { setToken } from "../state/slices/userSlice";

const MyCarsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.cars.cars);
  const { currentUser, isAuthenticated } = useSelector(
    (state: RootState) => state.users
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [photo, setPhoto] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const token = useSelector((state: RootState) => state.users.token);
  const [carToDelete, setCarToDelete] = useState(null);
  const loading = useSelector((state: RootState) => state.cars.loading);
  const [showQRCode, setShowQRCode] = useState({});
  const userId = currentUser?.id;

  useEffect(() => {
    async function readFromSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      token && dispatch(setToken(token));
    }
    readFromSecureStore();
  }, []);

  useEffect(() => {
    //console.log("currentUser:", currentUser);
    console.log("fetching cars for user", userId);
    dispatch(fetchCars());
  }, [dispatch, currentUser]);

  const handleAddCar = async () => {
    try {
      const newCarPayload = {
        userId: userId,
        licensePlate: licensePlate,
        photo: photo,
      };

      console.log("new car payload:", newCarPayload);
      const resultAction = await dispatch(addCar(newCarPayload));
      if (addCar.fulfilled.match(resultAction)) {
        setPhoto("");
        setLicensePlate("");
        setModalVisible(false);
        dispatch(fetchCars());
      }
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

  const handleDeleteCar = (car) => {
    setCarToDelete(car);
    setDeleteModalVisible(true);
  };

  const confirmDeleteCar = () => {
    if (carToDelete) {
      console.log("in confirm " + carToDelete.id);
      dispatch(deleteCar(carToDelete.id));
      setDeleteModalVisible(false);
      setCarToDelete(null);
    }
  };

  const toggleQRCode = (carId) => {
    setShowQRCode((prevShowQRCode) => ({
      ...prevShowQRCode,
      [carId]: !prevShowQRCode[carId],
    }));
  };

  if (loading || !cars) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#34B566" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.goBack()}
        >
          <ArrowIcon width={25} height={25} fill={"#808285"} />
        </TouchableOpacity>

        {/* Title and Car Icon */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Cars</Text>
          <CarIcon width={30} height={30} fill={"black"} />
        </View>

        {/* Dynamic Car List */}
        <View style={styles.carListContainer}>
          {/* Container with Background Color */}
          {cars.map((car, index) => {
            return (
              <View key={index} style={styles.carCardContainer}>
                {/* QR Code */}
                {showQRCode[car.id] && (
                  <QRCode value={car.qrCodeData} size={250} />
                )}

                {/* Car Image */}
                {car.photo && <Image src={car.photo} style={styles.photo} />}
                {/* License Plate Text + QR code button */}
                <View style={styles.infoContainer}>
                  <View style={styles.leftContainer}>
                    <Text style={styles.licensePlateText}>
                      {car.licensePlate}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.rightContainer,
                      showQRCode[car.id] ? styles.showQRCodeButton : null,
                    ]}
                    onPress={() => toggleQRCode(car.id)}
                  >
                    <Text style={styles.qrCodeButtonText}>
                      {showQRCode[car.id] ? "Hide QR code" : "Show QR code"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => handleDeleteCar(car)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add a New Car</Text>
              {/* License Plate Input */}
              <TextInput
                style={styles.input}
                placeholder="License Plate"
                value={licensePlate}
                onChangeText={setLicensePlate}
              />

              {/* Hidden User ID */}
              <TextInput
                style={styles.hiddenInput}
                value={`${userId}`}
                editable={false}
              />

              <TouchableOpacity
                style={styles.cameraButton}
                onPress={openCamera}
              >
                <Text style={styles.cameraButtonText}>Take photo of car</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddCar}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Delete Modal */}
        <Modal
          visible={deleteModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Confirm Delete</Text>
              <Text>Are you sure you want to delete this car?</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmDeleteCar}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      {/* Add Car Button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add car</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
    position: "relative",
    paddingBottom: 80,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10, // Adjust the bottom position to set the distance from the bottom
    left: 16,
    right: 16,
    backgroundColor: "#808285",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
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
  infoContainer: {
    flexDirection: "row",
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: "#F2F3F4",
    marginBottom: 15,
  },
  leftContainer: {
    flex: 2,
    paddingVertical: 25,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 2,
    backgroundColor: "#34B566",
    justifyContent: "center",
    transform: [{ skewX: "-30deg" }],
    marginRight: -20,
    paddingRight: 15,
  },
  showQRCodeButton: {
    backgroundColor: "#808285",
  },
  licensePlateText: {
    color: "#1E1E1E",
    fontFamily: "Gilroy-Heavy",
    fontSize: 18,
    textAlign: "left",
  },
  qrCodeButtonText: {
    color: "#fff",
    fontFamily: "Gilroy-SemiBold",
    fontSize: 16,
    textAlign: "center",
    transform: [{ skewX: "30deg" }],
  },
  deleteText: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 16,
    color: "#fff",
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
  deleteButton: {
    backgroundColor: "#E3513A",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
    width: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
  },
});

export default MyCarsScreen;
