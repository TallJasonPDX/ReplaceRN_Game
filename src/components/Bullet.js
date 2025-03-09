
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Bullet = ({ position }) => (
  <Image
    source={require('../assets/bullet.png')}
    style={[styles.bullet, { left: position[0], top: position[1] }]}
  />
);

const styles = StyleSheet.create({
  bullet: {
    position: 'absolute',
    width: 10,
    height: 10,
    resizeMode: 'contain'
  }
});

export default Bullet;
