
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Obstacle = ({ position, width, height }) => (
  <Image
    source={require('../assets/obstacle.png')}
    style={[styles.obstacle, { left: position[0], top: position[1], width, height }]}
  />
);

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    resizeMode: 'stretch'
  }
});

export default Obstacle;
