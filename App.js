import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { GameEngine } from "react-native-game-engine";
import Syringe from "./src/components/Syringe";
import Nurse from "./src/components/Nurse";
import Obstacle from "./src/components/Obstacle";
import Bullet from "./src/components/Bullet";
import MoveNurses from "./src/systems/MoveNurses";
import ShootSystem from "./src/systems/ShootSystem";
import TouchControls from "./src/systems/TouchControls";
import MoveObstacles from "./src/systems/MoveObstacles";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);

  const restart = () => {
    gameEngine.swap(getEntities());
    setScore(0);
    setRunning(true);
  };

  useEffect(() => {
    if (running && gameEngine) {
      const interval = setInterval(() => {
        const nurseId = `nurse-${Date.now()}`;
        const nurseX = Math.floor(Math.random() * (width - 40));
        gameEngine.dispatch({
          type: "add-entity",
          entity: {
            id: nurseId,
            position: [nurseX, 20],
            size: 20,
            speed: 50,
            renderer: <Nurse />,
          },
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [running, gameEngine]);

  useEffect(() => {
    if (running && gameEngine) {
      const patientInterval = setInterval(() => {
        const patientId = `patient-${Date.now()}`;
        gameEngine.dispatch({
          type: "add-entity",
          entity: {
            id: patientId,
            position: [-50, height / 2 + Math.random() * 200 - 100],
            width: 40,
            height: 40,
            speed: 50,
            renderer: <Obstacle width={40} height={40} />,
          },
        });
      }, 5000);
      return () => clearInterval(patientInterval);
    }
  }, [running, gameEngine]);

  const getEntities = () => ({
    game: { dispatch: (action) => gameEngine?.dispatch(action) },
    syringe: { position: [width / 2 - 20, height - 60], renderer: <Syringe /> },
    obstacle1: {
      position: [width / 4, height / 2],
      width: 50,
      height: 80,
      renderer: <Obstacle width={50} height={80} />,
    },
    obstacle2: {
      position: [(3 * width) / 4 - 50, height / 2 + 100],
      width: 50,
      height: 80,
      renderer: <Obstacle width={50} height={80} />,
    },
    background: {
      position: [0, 0],
      width,
      height,
      renderer: <View style={[styles.background, { zIndex: 0 }]} />,
    },
  });

  const onEvent = (e) => {
    if (e.type === "game-over") setRunning(false);
    else if (e.type === "score") setScore((prev) => prev + 1);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />
      <PanGestureHandler
        onGestureEvent={(e) =>
          gameEngine?.dispatch({ type: "move", event: e.nativeEvent })
        }
        onHandlerStateChange={(e) =>
          gameEngine?.dispatch({ type: "shoot", event: e.nativeEvent })
        }
      >
        <View style={styles.game}>
          <GameEngine
            ref={setGameEngine}
            style={styles.game}
            entities={getEntities()}
            systems={[MoveNurses, ShootSystem, TouchControls, MoveObstacles]}
            running={running}
            onEvent={onEvent}
          />
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{score}</Text>
          </View>
          {!running && (
            <View style={styles.gameOverContainer}>
              <Text style={styles.gameOver}>Game Over</Text>
              <Text style={styles.finalScore}>Score: {score}</Text>
              <TouchableOpacity style={styles.restartButton} onPress={restart}>
                <Text style={styles.restartText}>Restart</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  game: { flex: 1, backgroundColor: "#eee" },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#e0e0e0",
  },
  scoreContainer: { position: "absolute", top: 40, right: 20, zIndex: 10 },
  score: { fontSize: 24, fontWeight: "bold", color: "black" },
  gameOverContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  gameOver: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  finalScore: { fontSize: 24, color: "white", marginBottom: 40 },
  restartButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  restartText: { fontSize: 18, fontWeight: "bold", color: "white" },
});
