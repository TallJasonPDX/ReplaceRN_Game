import React from "react";
import { View, StyleSheet } from "react-native";

const Syringe = ({ position }) => (
  <View style={[styles.syringe, { left: position[0], top: position[1] }]} />
);

const styles = StyleSheet.create({
  syringe: {
    width: 40,
    height: 40,
    backgroundColor: "gray",
    position: "absolute",
    zIndex: 5,
  },
});

export default Syringe;
