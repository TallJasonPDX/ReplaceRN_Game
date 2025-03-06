
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const MoveNurses = (entities, { time }) => {
  const nurses = Object.keys(entities).filter(key => key.startsWith('nurse-'));
  
  nurses.forEach(nurseId => {
    if (entities[nurseId]) {
      // Move nurse down
      entities[nurseId].position[1] += (entities[nurseId].speed || 1) * (time.delta / 16);
      
      // Check if nurse reached bottom of screen
      if (entities[nurseId].position[1] > height) {
        // Game over condition
        if (entities.game) {
          entities.game.dispatch({ type: 'game-over' });
        }
        delete entities[nurseId];
      }
    }
  });
  
  return entities;
};

export default MoveNurses;
