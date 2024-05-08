import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressBarProps {
  text: string;
  progress: number;
  width: number;
  height: number;
  backgroundColor: string;
  fillColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  text,
  progress,
  width,
  height,
  backgroundColor,
  fillColor,
}) => {
  const filledWidth = width * progress;
  return (
    <View>
      <Text style={styles.progressText}>{text}</Text>
      <View style={[styles.container, { width, height, backgroundColor }]}>
        <View
          style={[
            styles.filled,
            {
              width: filledWidth,
              height: height * 2,
              backgroundColor: fillColor,
              transform: [{ skewX: "-30deg" }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    position: "relative",
  },
  filled: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  progressText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    marginRight: 60,
    fontFamily: "Gilroy-ExtraBold",
  },
});

export default ProgressBar;
