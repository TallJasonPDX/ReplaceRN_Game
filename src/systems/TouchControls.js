import { Dimensions } from "react-native";
import Bullet from "../components/Bullet";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;

const TouchControls = (entities, { dispatch }) => {
  const syringe = entities.syringe;
  const scale = entities.game?.scale || 1;
  let pullBack = 0;

  return {
    onMove: (event) => {
      const { translationX } = event;
      syringe.position[0] = Math.max(
        0,
        Math.min(translationX + width / 2 - 20 * scale, width - 40 * scale),
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
            position: [syringe.position[0] + 15 * scale, syringe.position[1]],
            speed: (pullBack / 10) * scale,
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
