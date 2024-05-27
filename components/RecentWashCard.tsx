import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import LocationIcon from "../assets/svg/location.svg"; // Import your location icon SVG here
import { useNavigation } from "@react-navigation/native";

type RecentWashCardProps = {
  imgSrc: string;
  locationName: string;
  updatedAt: string;
  link: string;
};

const RecentWashCard: React.FC<RecentWashCardProps> = ({
  imgSrc,
  locationName,
  updatedAt,
  link
}) => {
  const clickButton = () => {
    if(link?.startsWith('https://'))
      Linking.openURL(link)
  }

  return (
    <View style={styles.container}>
      {/* {ImageComponent} */}
      <Image src={imgSrc} style={styles.image} />
      <View style={styles.infoContainer}>
        <LocationIcon width={24} height={24} style={styles.icon} />
        <Text style={styles.title}>{locationName}</Text>
        <Text style={styles.text}>{updatedAt}</Text>
        <TouchableOpacity style={styles.button} onPress={clickButton}>
          <Text style={styles.buttonText}>{"Get directions >"}</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: 'auto',
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    transform: [{ skewX: "30deg" }],
  },
});

export default RecentWashCard;
