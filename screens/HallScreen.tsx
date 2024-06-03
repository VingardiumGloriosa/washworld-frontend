import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList, Image, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import WashCard from "../components/WashCard";
import Title from "../components/Title";
import WashHallIcon from "../assets/svg/halls.svg";
import LocationIcon from "../assets/svg/location.svg";
import MapIcon from "../assets/svg/map.svg";
import DropDownPicker from "react-native-dropdown-picker";
import { AppDispatch, RootState } from "../state/store";
import { calculateDistancesForAllLocations, fetchAllLocations } from "../state/slices/locationsSlice";
import Geolocation from "react-native-geolocation-service";

const HallScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const loading = useSelector((state: RootState) => state.location.loading);
  const error = useSelector((state: RootState) => state.location.error);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("any");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const DEFAULT_LOCATION = {
      latitude: 55.77419181465124,
      longitude: 12.514585695774914,
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          });
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation?.getCurrentPosition(
              (position) => {
                dispatch(calculateDistancesForAllLocations(position.coords));
              },
              (error) => {
                console.log(error.code, error.message);
                dispatch(calculateDistancesForAllLocations(DEFAULT_LOCATION));
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            ); 
          } else {
            console.log("Location permission denied");
            dispatch(calculateDistancesForAllLocations(DEFAULT_LOCATION));
          }
        } catch (err) {
          console.warn(err);
          dispatch(calculateDistancesForAllLocations(DEFAULT_LOCATION));
        }
      }
    };

    requestLocationPermission();
  }, [dispatch, Geolocation, PermissionsAndroid.RESULTS, PermissionsAndroid.PERMISSIONS, Platform.OS]);

  useEffect(() => {
    if (locations.length > 0) {
      const uniqueLocations = [
        { label: "Any Location", value: "any" },
        ...[...new Set(locations.map((item) => item.name))].map((location) => ({
          label: location,
          value: location.toLowerCase(),
        })),
      ];
      setItems(uniqueLocations);
    }
  }, [locations]);

  const filteredWashHallData = value === "any" ? locations : locations.filter((item) => item.name.toLowerCase() === value);

  const renderItem = useCallback(({ item }) => {
    // Ensure washHalls and selfWashHalls exist and provide default values if not
    const washHalls = item.washHalls || { available: 0, total: 0, outOfService: 0, nextAvailable: null };
    const selfWashHalls = item.selfWashHalls || { available: 0, total: 0, outOfService: 0, nextAvailable: null };
    const distanceInKm = item.distance ? (item.distance / 1000).toFixed(1) : null;
    return (
      <WashCard
        key={item.id}
        ImageComponent={
          <Image
            source={{ uri: item.photo }} // Use the URI from the item's photo
            style={{ width: 100, height: 60 }} // Apply any additional styles if needed
          />
        }
        locationName={item.name}
        address={item.address}
        distance={distanceInKm ?? "N/A"}
        availableWashHalls={washHalls.available.toString()}
        availableSelfWash={selfWashHalls.available.toString()}
        totalWashHalls={washHalls.total.toString()}
        totalSelfWash={selfWashHalls.total.toString()}
        outOfService={washHalls.outOfService}
        waitTime={0} // Assuming wait time is not available from the API
      />
    );
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#34B566" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.iconCircle}>
          <LocationIcon fill="#34B566" width={25} height={25} />
        </View>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={true}
            searchPlaceholder="Search for a location"
            style={styles.dropdownStyle}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            textStyle={styles.dropdownText}
            listItemLabelStyle={styles.listItemLabel}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <MapIcon fill="#34B566" width={40} height={40} />
        </TouchableOpacity>
      </View>
      <Title text={"Wash Halls"} Icon={WashHallIcon} width={30} height={30} />
      <FlatList data={filteredWashHallData} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
    zIndex: 1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    zIndex: 1000,
  },
  iconCircle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6E7E9",
    borderRadius: 50,
    height: 40,
    width: 40,
    marginHorizontal: 5,
  },
  dropdownWrapper: {
    flex: 1,
    zIndex: 10000,
    marginHorizontal: 5,
  },
  dropdownStyle: {
    borderColor: "transparent",
    height: 40,
    backgroundColor: "transparent",
  },
  dropdownContainerStyle: {
    borderWidth: 0,
    borderRadius: 0,
    zIndex: 10000,
    borderColor: "transparent",
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Gilroy-Regular",
  },
  listItemLabel: {
    fontSize: 16,
    fontFamily: "Gilroy-Regular",
  },
});

export default HallScreen;
