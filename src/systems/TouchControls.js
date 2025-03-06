
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TouchControls = (entities, { touches }) => {
  // Handle taps for shooting
  touches.filter(t => t.type === 'press').forEach(t => {
    if (entities.game && entities.syringe) {
      const syringePos = entities.syringe.position;
      
      // Create a bullet at the syringe position
      const bulletId = `bullet-${Date.now()}`;
      entities.game.dispatch({
        type: 'add-entity',
        entity: {
          id: bulletId,
          position: [syringePos[0] + 20, syringePos[1]], // Center of the syringe
          renderer: require('../components/Bullet').default
        }
      });
    }
  });

  // Handle movement of the syringe
  touches.filter(t => t.type === 'move').forEach(t => {
    if (entities.syringe) {
      entities.syringe.position[0] = t.event.pageX - 20; // Center syringe on touch point
    }
  });

  return entities;
};

export default TouchControls;
