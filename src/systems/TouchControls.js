import { Dimensions } from "react-native";
import Bullet from "../components/Bullet";

const { width, height } = Dimensions.get("window");

const TouchControls = (entities, { dispatch }) => {
  const syringe = entities.syringe;
  let pullBack = 0;

  return {
    onMove: (event) => {
      const { translationX } = event;
      syringe.position[0] = Math.max(
        0,
        Math.min(translationX + width / 2 - 20, width - 40),
      );
    },
    onShoot: (event) => {
      const { state, translationY } = event;
      if (state === 2) {
        // BEGAN
        pullBack = 0;
      } else if (state === 4) {
        // ACTIVE
        pullBack = Math.min(translationY * -1, 100); // Limit pull-back
      } else if (state === 5 && pullBack > 10) {
        // END
        const bulletId = `bullet-${Date.now()}`;
        dispatch({
          type: "add-entity",
          entity: {
            id: bulletId,
            position: [syringe.position[0] + 15, syringe.position[1]],
            speed: pullBack / 10,
            renderer: <Bullet />,
          },
        });
      }
    },
  };
};

export default (entities, { events }) => {
  const controls = TouchControls(entities, {
    dispatch: entities.game?.dispatch,
  });
  events.forEach((e) => {
    if (e.type === "move") controls.onMove(e.event);
    if (e.type === "shoot") controls.onShoot(e.event);
  });
  return entities;
};
