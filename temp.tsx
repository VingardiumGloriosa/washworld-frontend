import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import WashCard from "../components/WashCard";
import Title from "../components/Title";
import WashHallIcon from "../assets/svg/halls.svg";
import LocationIcon from "../assets/svg/location.svg";
import MapIcon from "../assets/svg/map.svg";
import DropDownPicker from "react-native-dropdown-picker";
import { debounce } from "lodash";

//GOTTTA FETCH STUFF HERE YALL
const fetchWashHallData = async () => {
  // dummy data
  return Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    locationName: `Location ${index + 1}`,
    address: `Address ${index + 1}`,
    distance: (Math.random() * 10).toFixed(1),
    availableWashHalls: (Math.random() * 5).toFixed(0),
    availableSelfWash: (Math.random() * 5).toFixed(0),
    totalWashHalls: "5",
    totalSelfWash: "5",
    ourOfService: (Math.random() * 3).toFixed(0),
    waitTime: (Math.random() * 15).toFixed(0),
  }));
};

const HallScreen = () => {
  const [washHallData, setWashHallData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("any");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchWashHallData();
        setWashHallData(data);

        const uniqueLocations = [
          { label: "Any Location", value: "any" },
          ...[...new Set(data.map((item) => item.locationName))].map(
            (location) => ({ label: location, value: location.toLowerCase() })
          ),
        ];
        setItems(uniqueLocations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredWashHallData =
    value === "any"
      ? washHallData
      : washHallData.filter(
          (item) => item.locationName.toLowerCase() === value
        );

  const renderItem = useCallback(
    ({ item }) => (
      <WashCard
        key={item.id}
        ImageComponent={
          <Image
            source={require("../assets/images/hall.jpeg")}
            style={{ width: 100, height: 60 }}
          />
        }
        locationName={item.locationName}
        address={item.address}
        distance={item.distance}
        availableWashHalls={item.availableWashHalls}
        availableSelfWash={item.availableSelfWash}
        totalWashHalls={item.totalWashHalls}
        totalSelfWash={item.totalSelfWash}
        ourOfService={parseInt(item.ourOfService, 10)}
        waitTime={parseInt(item.waitTime, 10)}
      />
    ),
    []
  );

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
        <MapIcon fill="#34B566" width={40} height={40} />
      </View>
      <Title text={"Wash Halls"} Icon={WashHallIcon} width={30} height={30} />
      <FlatList
        data={filteredWashHallData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
