import { Dimensions } from 'react-native';
import React from 'react';
import Bullet from '../components/Bullet';

const { width, height } = Dimensions.get('window');

const TouchControls = (entities, { touches }) => {
  const syringe = entities.syringe;

  // Handle touches
  touches.filter(t => t.type === 'move').forEach(t => {
    // Move syringe left or right
    syringe.position[0] = t.event.pageX - 20; // Center the syringe under the touch

    // Ensure syringe stays within screen bounds
    if (syringe.position[0] < 0) syringe.position[0] = 0;
    if (syringe.position[0] > width - 40) syringe.position[0] = width - 40;
  });

  // Shoot on touch end (implement slingshot mechanic later)
  touches.filter(t => t.type === 'end').forEach(t => {
    // Create a new bullet entity
    const bulletId = `bullet-${Date.now()}`;
    entities[bulletId] = {
      position: [syringe.position[0] + 15, syringe.position[1] - 10], // Position at syringe tip
      speed: 5,
      renderer: <Bullet />
    };
  });

  return entities;
};

export default TouchControls;