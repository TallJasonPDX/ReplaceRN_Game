
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
