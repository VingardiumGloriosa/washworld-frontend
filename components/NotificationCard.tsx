import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CloseIcon from "../assets/svg/x.svg";

type NotificationCardProps = {
  ImageComponent: React.ReactElement;
  title: string;
  description: string;
  onDelete: () => void;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  ImageComponent,
  title,
  description,
  onDelete,
}) => {
  return (
    <SafeAreaView style={styles.card}>
      {ImageComponent}
      <View style={styles.textContainer}>
        <View style={styles.firstLine}>
          <Text style={styles.title}>{title}</Text>
          <CloseIcon onPress={onDelete} />
          {/* Attach the onDelete function here my BOISSSSS N GIRLS*/}
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E6E7E9",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    margin: 10,
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    padding: 10,
    fontFamily: "Gilroy-Regular",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Gilroy-Regular",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default NotificationCard;
