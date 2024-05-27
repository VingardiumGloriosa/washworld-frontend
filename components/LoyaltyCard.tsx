import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const LoyaltyCard = ({ title, isActive, onPress = () => {} }) => {
  const backgroundColor = isActive ? "#34B566" : "#E0E0E0";
  const textColor = isActive ? "#FFFFFF" : "#000000";
  const labelColor = "black";

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { backgroundColor }]}>
        <View style={[styles.label, { backgroundColor: labelColor }]}>
          <Text style={styles.labelText}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </Text>
        </View>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 160,
    width: 150,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginHorizontal: 10,
    paddingTop: 10,
    elevation: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  label: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: -15,
    transform: [{ skewX: "-30deg" }],
  },
  labelText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    transform: [{ skewX: "30deg" }],
    marginLeft: 15,
    fontFamily: "Gilroy-Medium",
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    padding: 10,
    marginTop: 20,
    fontFamily: "Gilroy-Regular",
  },
});

export default LoyaltyCard;
