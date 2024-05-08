import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";

// Define the props outside the component
type Props = {
  text: string;
  Icon: React.FC<SvgProps>;
  width: number;
  height: number;
};

const Title: React.FC<Props> = ({ text, Icon, width, height }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>{text}</Text>
      <Icon width={width} height={height} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
    paddingRight: 5,
    fontFamily: "Gilroy-ExtraBold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
});

export default Title;
