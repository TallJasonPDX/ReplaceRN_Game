import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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