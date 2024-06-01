import React, { useEffect, useMemo } from "react";
import { View, SafeAreaView, StyleSheet, Dimensions, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../state/slices/userSlice";
import LoyaltyCarousel from "../components/LoyaltyCarousel";
import Logo from "../assets/svg/logo.svg";
import ProgressBar from "../components/ProgressBar";
import Title from "../components/Title";
import ClockIcon from "../assets/svg/movingClock.svg";
import RecentWashCard from "../components/RecentWashCard";
import { AppDispatch, RootState } from "../state/store";

const screenWidth = Dimensions.get("window").width;

const HistoryScreen = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.users.currentUser);
  const history = currentUser?.history || [];

  useEffect(() => {
      dispatch(fetchUserHistory());
      }, [dispatch]);

  const progressLeft = useMemo(() => {
    return currentUser ? currentUser.loyaltyRewardProgress?.goal - currentUser.loyaltyRewardProgress?.progress : null;
  }, [currentUser]);

  const progressText = useMemo(() => {
    return progressLeft ? `Wash your car ${progressLeft} more times to unlock the next reward!` : '';
  }, [progressLeft]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.logo}>
          <Logo width={160} height={80} />
        </View>
        <LoyaltyCarousel 
          userId={currentUser?.id || 9} 
          rewards={currentUser?.loyaltyRewards || []} 
          dispatch={dispatch} 
        />
        <View style={styles.progressBarContainer}>
          <ProgressBar 
            text={progressText} 
            progress={currentUser?.loyaltyRewardProgress?.progress / currentUser?.loyaltyRewardProgress?.goal || 0} 
            width={screenWidth - 40} 
            height={20} 
            backgroundColor="#f0f0f0" 
            fillColor="#34B566" 
          />
        </View>
        <View>
          <Title text="Recent washes" Icon={ClockIcon} width={30} height={30} />
          {history.length === 0 ? (
            <Text style={styles.encouragementText}>
              You don't have any recent washes. Wash your car to keep it shiny and earn rewards!
            </Text>
          ) : (
            history.map((wash) => (
              <RecentWashCard 
                key={wash.id} 
                imgSrc={wash.location.photo} 
                locationName={wash.location.name} 
                updatedAt={wash.date} 
                link={wash.location.mapsUrl} 
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

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
  encouragementText: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#808285",
  },
});

export default HistoryScreen;
