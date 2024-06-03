import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const GlobalLoader: React.FC = () => {
  const loading = useSelector((state: RootState) => state.global.loading);

  if (!loading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#34B566" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
});

export default GlobalLoader;
