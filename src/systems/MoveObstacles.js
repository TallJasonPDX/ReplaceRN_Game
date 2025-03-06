
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MoveObstacles = (entities, { time }) => {
  const obstacles = Object.keys(entities).filter(key => key.startsWith('patient-'));
  
  obstacles.forEach(obstacleId => {
    if (entities[obstacleId]) {
      // Move obstacle horizontally
      entities[obstacleId].position[0] += (entities[obstacleId].speed || 1) * (time.delta / 16);
      
      // Check if obstacle went off screen
      if (entities[obstacleId].position[0] > width + 50) {
        delete entities[obstacleId];
      }
    }
  });
  
  return entities;
};

export default MoveObstacles;
