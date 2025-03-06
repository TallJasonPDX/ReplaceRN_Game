
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Bullet = ({ position }) => (
  <View style={[styles.bullet, { left: position[0], top: position[1] }]} />
);

const styles = StyleSheet.create({
  bullet: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 5
  }
});

export default Bullet;
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Bullet = () => {
  return <View style={styles.bullet} />;
};

const styles = StyleSheet.create({
  bullet: {
    width: 10,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    position: 'absolute',
  }
});

export default Bullet;
