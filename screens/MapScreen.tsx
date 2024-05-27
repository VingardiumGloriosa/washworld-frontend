// src/screens/MapScreen.js
import React, { useEffect } from "react";
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
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocations } from "../state/slices/locationsSlice";

const MapScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  
  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch]);

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
        {/* Add markers for each location */}
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
        ))}
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