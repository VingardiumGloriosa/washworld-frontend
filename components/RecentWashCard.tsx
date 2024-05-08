import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LocationIcon from "../assets/svg/location.svg"; // Import your location icon SVG here

type RecentWashCardProps = {
  ImageComponent: React.ReactElement;
  locationName: string;
  updatedAt: string;
};

const RecentWashCard: React.FC<RecentWashCardProps> = ({
  ImageComponent,
  locationName,
  updatedAt,
}) => {
  return (
    <View style={styles.container}>
      {ImageComponent}
      <View style={styles.infoContainer}>
        <LocationIcon width={24} height={24} style={styles.icon} />
        <Text style={styles.title}>{locationName}</Text>
        <Text style={styles.text}>{updatedAt}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{"View location >"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E6E7E9",
    alignItems: "center",
    overflow: "hidden",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  icon: {
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
  },
  text: {
    fontSize: 14,
    color: "black",
    fontFamily: "Gilroy-Regular",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#34B566",
    justifyContent: "center",
    transform: [{ skewX: "-30deg" }],
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: -10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    transform: [{ skewX: "30deg" }],
  },
});

export default RecentWashCard;
