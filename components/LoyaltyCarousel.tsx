import React from "react";
import { View, FlatList, Dimensions, StyleSheet, Text } from "react-native";
import LoyaltyCard from "./LoyaltyCard";
import Crown from "../assets/svg/crown.svg";
import Title from "./Title";
import { LoyaltyReward } from "../state/slices/loyaltyRewardSlice";

interface LoyaltyCarouselProps {
  rewards: LoyaltyReward[];
}

const { width: viewportWidth } = Dimensions.get("window");

const LoyaltyCarousel: React.FC<LoyaltyCarouselProps> = ({ rewards }) => {
  /*  Temporary data */
  const entries = Array.from({ length: 10 }, (_, i) => ({
    id: String(i),
    title: `${i * 10}% Off next wash`,
    isActive: i % 2 === 0,
  }));

  const renderItem = ({ item }) => {
    return <LoyaltyCard title={item.title} isActive={item.isActive} />;
  };

  /* uncomment when ready to implement */
  /* const renderItem = ({ item }: { item: LoyaltyReward }) => {
    return <LoyaltyCard title={item.name} isActive={item.isActive} />; // Render LoyaltyCard with reward name and isActive status
  }; */

  return (
    <View style={styles.container}>
      <Title text="My loyalty bonuses" Icon={Crown} width={30} height={30} />

      {/* Temporary data */}
      <FlatList data={entries} renderItem={renderItem} keyExtractor={(item) => item.id} horizontal={true} showsHorizontalScrollIndicator={false} snapToAlignment="start" snapToInterval={170} decelerationRate="fast" initialNumToRender={10} />

      {/* uncomment when ready to implement */}
      {/* <FlatList
        data={rewards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={170}
        decelerationRate="fast"
        initialNumToRender={10}
      /> */}
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
