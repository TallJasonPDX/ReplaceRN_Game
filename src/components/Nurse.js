
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Nurse = ({ position, size }) => (
  <View style={[styles.nurse, { left: position[0], top: position[1], width: size, height: size }]} />
);

const styles = StyleSheet.create({
  nurse: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 5
  }
});

export default Nurse;
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Nurse = ({ size }) => {
  return <View style={[styles.nurse, { width: size, height: size }]} />;
};

const styles = StyleSheet.create({
  nurse: {
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 20,
  }
});

export default Nurse;
