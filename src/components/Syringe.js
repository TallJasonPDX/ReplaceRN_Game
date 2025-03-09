
import React from "react";
import { Image, StyleSheet } from "react-native";

const Syringe = ({ position }) => (
  <Image
    source={require('../assets/syringe.png')}
    style={[styles.syringe, { left: position[0], top: position[1] }]}
  />
);

const styles = StyleSheet.create({
  syringe: {
    width: 40,
    height: 40,
    position: "absolute",
    zIndex: 5,
    resizeMode: "contain"
  },
});

export default Syringe;
