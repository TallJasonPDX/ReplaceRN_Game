import React from 'react';
import { View, StyleSheet } from 'react-native';

const Obstacle = ({ position, width, height }) => (
  <View style={[styles.obstacle, { left: position[0], top: position[1], width, height }]} />
);

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    backgroundColor: '#8B4513'
  }
});

export default Obstacle;