import React from 'react';
import { View, StyleSheet } from 'react-native';

const Nurse = ({ position, size }) => (
  <View style={[styles.nurse, { left: position[0], top: position[1], width: size, height: size }]} />
);

const styles = StyleSheet.create({
  nurse: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 20,
    zIndex: 5
  }
});

export default Nurse;