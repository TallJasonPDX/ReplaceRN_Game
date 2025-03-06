import React from 'react';
import { View, StyleSheet } from 'react-native';

const Syringe = () => {
  return <View style={styles.syringe} />;
};

const styles = StyleSheet.create({
  syringe: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    position: 'absolute',
  }
});

export default Syringe;