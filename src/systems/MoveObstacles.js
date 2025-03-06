
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MoveObstacles = (entities, { time }) => {
  const patients = Object.keys(entities).filter(key => key.includes('patient'));
  
  patients.forEach(key => {
    const patient = entities[key];
    patient.position[0] += patient.speed * (time.delta / 1000);
    
    if (patient.position[0] > width) {
      delete entities[key];
    }
  });
  
  return entities;
};

export default MoveObstacles;
