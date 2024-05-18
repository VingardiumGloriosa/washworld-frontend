import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../assets/svg/leftArrow.svg";
import CarIcon from "../assets/svg/car.svg";

const MyCarsScreen = () => {
  const navigation = useNavigation();

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

        {/* Container with Background Color */}
        <View style={styles.contentContainer}>
          {/* QR Code Image */}
          <Image source={require("../assets/images/qr-code.png")} style={styles.qrCodeImage} />

          {/* Car Image */}
          <Image source={require("../assets/images/toyota.jpg")} style={styles.carImage} />

          {/* License Plate Text */}
          <Text style={styles.licensePlate}>License Plate: ABC123</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add car</Text>
        </TouchableOpacity>
      </View>
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
  contentContainer: {
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
});

export default MyCarsScreen;
