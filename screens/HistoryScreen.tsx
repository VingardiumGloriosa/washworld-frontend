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
import { fetchUserProfile } from "../state/slices/userSlice";
import { current } from "@reduxjs/toolkit";

const screenWidth = Dimensions.get("window").width;

export default function HistoryScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.users.currentUser?.history || []);
  const currentUser = useSelector((state: RootState) => state.users.currentUser);

  useEffect(() => {
    // if(currentUser)
    dispatch(fetchUserProfile(9));
  }, [dispatch]);

  const progressLeft = currentUser ? currentUser.loyaltyRewardProgress?.goal - currentUser.loyaltyRewardProgress?.progress : null
  const progressText = progressLeft ? `Wash your car ${progressLeft} more times to unlock the next reward!` : ''

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.logo}>
          <Logo width={160} height={80} />
        </View>
        <LoyaltyCarousel userId={currentUser?.id || 9} rewards={currentUser?.loyaltyRewards || []} dispatch={dispatch} />
        <View style={styles.progressBarContainer}>
          <ProgressBar text={progressText} progress={currentUser?.loyaltyRewardProgress?.progress/currentUser?.loyaltyRewardProgress?.goal || 0} width={screenWidth - 40} height={20} backgroundColor="#f0f0f0" fillColor="#34B566" />
        </View>
        <View>
          <Title text={"Recent washes"} Icon={ClockIcon} width={30} height={30} />
          {history.map((wash) => (
            <RecentWashCard key={wash.id} imgSrc={wash.location.photo} locationName={wash.location.name} updatedAt={wash.date} link={wash.location.mapsUrl} />
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
