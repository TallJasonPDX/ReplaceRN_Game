
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Syringe = ({ position }) => (
  <View style={[styles.syringe, { left: position[0] }]} />
);

const styles = StyleSheet.create({
  syringe: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: 40,
    backgroundColor: 'gray'
  }
});

export default Syringe;
