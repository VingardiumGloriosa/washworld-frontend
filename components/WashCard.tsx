import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoIcon from "../assets/svg/info.svg";
import ClockIcon from "../assets/svg/clock.svg";

type WashCardProps = {
  ImageComponent: React.ReactElement;
  locationName: string;
  address: string;
  distance: string;
  availableWashHalls: string;
  availableSelfWash: string;
  totalWashHalls: string;
  totalSelfWash: string;
  ourOfService: number;
  waitTime: number;
};

const WashCard: React.FC<WashCardProps> = ({
  ImageComponent,
  locationName,
  address,
  distance,
  availableWashHalls,
  availableSelfWash,
  totalWashHalls,
  totalSelfWash,
  ourOfService,
  waitTime,
}) => {
  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        {ImageComponent}
        <View style={styles.infoContainer}>
          <Text style={styles.locationName}>{locationName}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.distance}>{distance + " km"}</Text>
        </View>
      </View>
      <View style={styles.divider} />

      <Text style={styles.availability}>
        {"Available wash halls: " + availableWashHalls + " / " + totalWashHalls}
      </Text>
      <Text style={styles.availability}>
        {"Available self wash: " + availableSelfWash + " / " + totalSelfWash}
      </Text>

      {/* Only show "out of service" info if `ourOfService` is greater than zero */}
      {ourOfService > 0 && (
        <View style={styles.serviceLine}>
          <InfoIcon width={20} height={20} />
          <Text style={styles.service}>
            {ourOfService + " out of service "}
          </Text>
        </View>
      )}

      {/* Only show "wait time" info if `waitTime` is greater than zero */}
      {waitTime > 0 && (
        <View style={styles.serviceLine}>
          <ClockIcon width={20} height={20} />
          <Text style={styles.wait}>{waitTime + " min wait time "}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
    width: "100%",
  },
  maincontainer: {
    backgroundColor: "#E6E7E9",
    padding: 10,
    margin: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Gilroy-Heavy",
  },
  address: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Gilroy-Medium",
  },
  distance: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#34B566",
    fontFamily: "Gilroy-Medium",
  },
  availability: {
    fontSize: 14,
    fontFamily: "Gilroy-Medium",
  },
  serviceLine: {
    flexDirection: "row",
  },
  service: {
    fontSize: 14,
    fontFamily: "Gilroy-Medium",
    color: "#F36A21",
  },
  wait: {
    fontSize: 14,
    fontFamily: "Gilroy-Medium",
    color: "#34B566",
  },
});

export default WashCard;
