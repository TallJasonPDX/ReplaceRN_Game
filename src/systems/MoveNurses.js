
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
