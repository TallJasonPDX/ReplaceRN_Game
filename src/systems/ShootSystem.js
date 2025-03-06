const ShootSystem = (entities, { time }) => {
  const bullets = Object.keys(entities).filter((key) =>
    key.startsWith("bullet-"),
  );
  const nurses = Object.keys(entities).filter((key) =>
    key.startsWith("nurse-"),
  );

  bullets.forEach((bulletId) => {
    if (entities[bulletId]) {
      entities[bulletId].position[1] -= entities[bulletId].speed || 10;
      if (entities[bulletId].position[1] < 0) {
        delete entities[bulletId];
        return;
      }

      nurses.forEach((nurseId) => {
        const nurse = entities[nurseId];
        if (!nurse) return;
        const nursePos = nurse.position;
        const nurseSize = nurse.size || 20;
        const bulletPos = entities[bulletId].position;

        if (
          bulletPos[0] >= nursePos[0] &&
          bulletPos[0] <= nursePos[0] + nurseSize &&
          bulletPos[1] >= nursePos[1] &&
          bulletPos[1] <= nursePos[1] + nurseSize
        ) {
          delete entities[bulletId];
          delete entities[nurseId];
          entities.game?.dispatch({ type: "score" });
        }
      });
    }
  });

  return entities;
};

export default ShootSystem;
