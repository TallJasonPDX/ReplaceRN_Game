
const MoveNurses = (entities, { time }) => {
  // Get all nurse entities
  const nurses = Object.keys(entities).filter(key => key.includes('nurse'));
  
  // Move each nurse toward the player (bottom of screen)
  nurses.forEach(nurseKey => {
    const nurse = entities[nurseKey];
    
    // Move the nurse down (toward player)
    nurse.position[1] += nurse.speed * (time.delta / 1000);
    
    // Increase size as nurse gets closer to simulate depth
    nurse.size += nurse.growthRate * (time.delta / 1000);
    
    // Remove nurse if it reaches the bottom
    if (nurse.position[1] > 600) {
      delete entities[nurseKey];
    }
  });
  
  return entities;
};

export default MoveNurses;
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const MoveNurses = (entities, { time }) => {
  const nurses = Object.keys(entities).filter(key => key.includes('nurse'));
  const obstacles = Object.keys(entities).filter(key => key.includes('obstacle'));

  nurses.forEach(nurseKey => {
    const nurse = entities[nurseKey];
    nurse.position[1] += nurse.speed * (time.delta / 1000);
    nurse.size = 20 + (height - nurse.position[1]) / 20; // Larger as it gets closer

    // Obstacle avoidance
    obstacles.forEach(obsKey => {
      const obs = entities[obsKey];
      if (
        nurse.position[1] + nurse.size > obs.position[1] &&
        nurse.position[1] < obs.position[1] + obs.height &&
        nurse.position[0] + nurse.size > obs.position[0] &&
        nurse.position[0] < obs.position[0] + obs.width
      ) {
        nurse.position[0] += nurse.speed * (time.delta / 1000) * (nurse.position[0] < width / 2 ? -1 : 1);
      }
    });

    if (nurse.position[1] > height) {
      if (entities.game) {
        entities.game.dispatch({ type: 'game-over' });
      }
      delete entities[nurseKey];
    }
  });
  
  return entities;
};

export default MoveNurses;
