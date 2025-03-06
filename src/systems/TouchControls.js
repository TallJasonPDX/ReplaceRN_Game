
const TouchControls = (entities, { touches }) => {
  const syringe = entities.syringe;
  
  // Handle touches
  touches.filter(t => t.type === 'move').forEach(t => {
    // Move syringe left or right
    syringe.position[0] = t.event.pageX - 20; // Center the syringe under the touch
    
    // Ensure syringe stays within screen bounds
    if (syringe.position[0] < 0) syringe.position[0] = 0;
    if (syringe.position[0] > 320) syringe.position[0] = 320;
  });
  
  // Shoot on touch end (implement slingshot mechanic later)
  touches.filter(t => t.type === 'end').forEach(t => {
    // Create a new bullet entity
    const bulletId = `bullet-${Date.now()}`;
    entities[bulletId] = {
      position: [syringe.position[0] + 15, 580], // Position at syringe tip
      speed: 5,
      renderer: <Bullet />
    };
  });
  
  return entities;
};

export default TouchControls;
import { Dimensions } from 'react-native';
import React from 'react';
import Bullet from '../components/Bullet';

const { width, height } = Dimensions.get('window');

const TouchControls = (entities, { touches, dispatch }) => {
  const syringe = entities.syringe;
  
  touches.filter(t => t.type === 'move').forEach(t => {
    // Move syringe left/right based on touch position
    syringe.position[0] = Math.max(0, Math.min(t.event.pageX - 20, width - 40));
  });

  touches.filter(t => t.type === 'end').forEach(t => {
    // Create a bullet when touch ends
    const bulletId = `bullet-${Date.now()}`;
    entities[bulletId] = {
      position: [syringe.position[0] + 15, height - 60],
      speed: 200, // Fixed speed for now
      renderer: <Bullet />
    };
  });

  return entities;
};

export default TouchControls;
