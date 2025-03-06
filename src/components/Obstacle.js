
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Obstacle = ({ position, width, height }) => (
  <View style={[styles.obstacle, { left: position[0], top: position[1], width, height }]} />
);

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    backgroundColor: '#8a8a8a'
  }
});

export default Obstacle;
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Obstacle = ({ width, height }) => {
  return <View style={[styles.obstacle, { width, height }]} />;
};

const styles = StyleSheet.create({
  obstacle: {
    backgroundColor: '#8B4513',
    position: 'absolute',
  }
});

export default Obstacle;
