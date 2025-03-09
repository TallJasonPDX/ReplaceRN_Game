
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Nurse = ({ position, size }) => (
  <Image
    source={require('../assets/nurse.png')}
    style={[styles.nurse, { left: position[0], top: position[1], width: size, height: size }]}
  />
);

const styles = StyleSheet.create({
  nurse: {
    position: 'absolute',
    zIndex: 5,
    resizeMode: 'contain'
  }
});

export default Nurse;
