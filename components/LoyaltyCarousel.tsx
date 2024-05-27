import React from "react";
import { View, FlatList, Dimensions, StyleSheet, Text } from "react-native";
import LoyaltyCard from "./LoyaltyCard";
import Crown from "../assets/svg/crown.svg";
import Title from "./Title";
import { LoyaltyReward, toggleReward } from "../state/slices/loyaltyRewardSlice";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";

interface LoyaltyCarouselProps {
  rewards: LoyaltyReward[];
  userId: number;
  dispatch: ThunkDispatch<void, void, PayloadAction>;
}

const { width: viewportWidth } = Dimensions.get("window");

const LoyaltyCarousel: React.FC<LoyaltyCarouselProps> = ({ userId, rewards, dispatch }) => {

  const renderItem = ({ item }: { item: LoyaltyReward }) => {
    const handleCardClick = () => {
      dispatch(toggleReward({ userId: userId, rewardId: item.id, isActive: !item.isActive }))
      item.isActive = !item.isActive
    }

    return <LoyaltyCard title={item.name} isActive={item.isActive} onPress={handleCardClick} />;
  }; 

  return (
    <View style={styles.container}>
      <Title text="My loyalty bonuses" Icon={Crown} width={30} height={30} />

      <FlatList
        data={rewards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={170}
        decelerationRate="fast"
        initialNumToRender={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default LoyaltyCarousel;
