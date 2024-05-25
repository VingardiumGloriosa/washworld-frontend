import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import LoyaltyCarousel from "../components/LoyaltyCarousel";
import Logo from "../assets/svg/logo.svg";
import ProgressBar from "../components/ProgressBar";
import Title from "../components/Title";
import ClockIcon from "../assets/svg/movingClock.svg";
import RecentWashCard from "../components/RecentWashCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchRewards, toggleReward } from "../state/slices/loyaltyRewardSlice";
import { AppDispatch, RootState } from "../state/store";

const screenWidth = Dimensions.get("window").width;

export default function HistoryScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [progress, setProgress] = useState(0.5);
  const [progressText, setProgressText] = useState("Wash your car 3 more times to unlock the next bonus!");
  const [washHistory, setWashHistory] = useState([]);
  const rewards = useSelector((state: RootState) => state.loyaltyRewards.rewards);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);

  useEffect(() => {
    //here we gotta yeet and yoot some fetchiessss but for now its hardcoded to check that the components render as desired
    setWashHistory([
      {
        id: 1,
        locationName: "Hell",
        updatedAt: "Today",
        imageSrc: require("../assets/images/hall.jpeg"),
      },
      {
        id: 2,
        locationName: "Heaven",
        updatedAt: "Today",
        imageSrc: require("../assets/images/hall.jpeg"),
      },
      {
        id: 3,
        locationName: "Purgatory",
        updatedAt: "Yesterday",
        imageSrc: require("../assets/images/hall.jpeg"),
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.logo}>
          <Logo width={160} height={80} />
        </View>
        <LoyaltyCarousel rewards={rewards} />
        <View style={styles.progressBarContainer}>
          <ProgressBar text={progressText} progress={progress} width={screenWidth - 40} height={20} backgroundColor="#f0f0f0" fillColor="#34B566" />
        </View>
        <View>
          <Title text={"Recent washes"} Icon={ClockIcon} width={30} height={30} />
          {washHistory.map((wash) => (
            <RecentWashCard key={wash.id} ImageComponent={<Image source={wash.imageSrc} style={{ width: 100, height: 75 }} />} locationName={wash.locationName} updatedAt={wash.updatedAt} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "flex-start",
    paddingBottom: 50,
  },
});
