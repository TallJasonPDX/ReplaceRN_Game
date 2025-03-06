
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const ShootSystem = (entities, { time }) => {
  const bullets = Object.keys(entities).filter(key => key.startsWith('bullet-'));
  
  // Move each bullet up the screen
  bullets.forEach(bulletId => {
    if (entities[bulletId]) {
      // Move bullet up
      entities[bulletId].position[1] -= 10;
      
      // Check if bullet is off screen
      if (entities[bulletId].position[1] < 0) {
        delete entities[bulletId];
        return;
      }
      
      // Check for collisions with nurses
      const nurses = Object.keys(entities).filter(key => key.startsWith('nurse-'));
      for (let i = 0; i < nurses.length; i++) {
        const nurse = entities[nurses[i]];
        if (!nurse) continue;
        
        const nursePos = nurse.position;
        const nurseSize = nurse.size || 20;
        const bulletPos = entities[bulletId].position;
        
        // Simple collision detection
        if (
          bulletPos[0] >= nursePos[0] && 
          bulletPos[0] <= nursePos[0] + nurseSize &&
          bulletPos[1] >= nursePos[1] && 
          bulletPos[1] <= nursePos[1] + nurseSize
        ) {
          // Collision detected
          delete entities[bulletId];
          delete entities[nurses[i]];
          
          // Dispatch score event
          if (entities.game) {
            entities.game.dispatch({ type: 'score' });
          }
          break;
        }
      }
    }
  });
  
  return entities;
};

export default ShootSystem;
