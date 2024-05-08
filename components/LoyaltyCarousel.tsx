import React from "react";
import { View, FlatList, Dimensions, StyleSheet, Text } from "react-native";
import LoyaltyCard from "./LoyaltyCard";
import Crown from "../assets/svg/crown.svg";
import Title from "./Title";

const { width: viewportWidth } = Dimensions.get("window");

const LoyaltyCarousel = () => {
  const entries = Array.from({ length: 10 }, (_, i) => ({
    id: String(i),
    title: `${i * 10}% Off next wash`,
    isActive: i % 2 === 0,
  }));

  const renderItem = ({ item }) => {
    console.log("Rendering item:", item);
    return <LoyaltyCard title={item.title} isActive={item.isActive} />;
  };

  return (
    <View style={styles.container}>
      <Title text="My loyalty bonuses" Icon={Crown} width={30} height={30} />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
