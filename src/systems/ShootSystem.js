
const ShootSystem = (entities, { touches }) => {
  // Get all bullet entities
  const bullets = Object.keys(entities).filter(key => key.includes('bullet'));
  
  // Move each bullet
  bullets.forEach(bulletKey => {
    const bullet = entities[bulletKey];
    
    // Move the bullet up
    bullet.position[1] -= bullet.speed;
    
    // Remove bullet if it reaches the top
    if (bullet.position[1] < 0) {
      delete entities[bulletKey];
    }
  });
  
  return entities;
};

export default ShootSystem;
const ShootSystem = (entities, { dispatch }) => {
  const bullets = Object.keys(entities).filter(key => key.includes('bullet'));
  const nurses = Object.keys(entities).filter(key => key.includes('nurse'));
  const obstacles = Object.keys(entities).filter(key => key.includes('obstacle'));

  bullets.forEach(bulletKey => {
    const bullet = entities[bulletKey];
    bullet.position[1] -= bullet.speed;

    // Check for bullet-nurse collisions
    nurses.forEach(nurseKey => {
      const nurse = entities[nurseKey];
      const hit = (
        bullet.position[0] >= nurse.position[0] - nurse.size / 2 &&
        bullet.position[0] <= nurse.position[0] + nurse.size / 2 &&
        bullet.position[1] <= nurse.position[1] + nurse.size &&
        bullet.position[1] >= nurse.position[1]
      );
      
      if (hit) {
        delete entities[bulletKey];
        delete entities[nurseKey];
        dispatch({ type: 'score' });
        return;
      }
    });

    // Check for bullet-obstacle collisions
    obstacles.forEach(obstacleKey => {
      const obs = entities[obstacleKey];
      if (
        bullet.position[0] >= obs.position[0] &&
        bullet.position[0] <= obs.position[0] + obs.width &&
        bullet.position[1] <= obs.position[1] + obs.height &&
        bullet.position[1] >= obs.position[1]
      ) {
        delete entities[bulletKey];
        return;
      }
    });

    // Delete bullet if it goes off screen
    if (bullet.position[1] < 0) delete entities[bulletKey];
  });

  return entities;
};

export default ShootSystem;
