// src/screens/MapScreen.js
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import ArrowIcon from "../assets/svg/leftArrow.svg"; // Ensure the SVG path is correct
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const navigation = useNavigation();
  // const { locations } = route.params; // Receive locations data as props


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <ArrowIcon width={25} height={25} fill={"#808285"} />
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 55.6761,
          longitude: 12.5683,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Add markers for each location
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={location.address}
          />
        ))} */}
          <Marker
            key={1}
            coordinate={{
              latitude: 55.6806284057663,
              longitude: 12.5890510239421,
            }}
            title={'Inner City Wash'}
            description={'not dynamic'}
          />
        <Marker
            key={2}
            coordinate={{
              latitude: 55.67408217298727,
              longitude: 12.556828525791119,
            }}
            title={'Frederiksberg Wash'}
            description={'not dynamic'}
          />
           <Marker
            key={3}
            coordinate={{
              latitude: 55.670966636057756,
              longitude: 12.545858210448396,
            }}
            title={'Vesterbro Wash'}
            description={'not dynamic'}
          />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  map: {
    flex: 1,
  },
});

export default MapScreen;