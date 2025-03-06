
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GameEngine } from 'react-native-game-engine';

// Components
import Syringe from './src/components/Syringe';
import Nurse from './src/components/Nurse';
import Obstacle from './src/components/Obstacle';

// Systems
import MoveNurses from './src/systems/MoveNurses';
import ShootSystem from './src/systems/ShootSystem';
import TouchControls from './src/systems/TouchControls';
import MoveObstacles from './src/systems/MoveObstacles';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  
  // Restart game function
  const restart = () => {
    gameEngine.swap(getEntities());
    setScore(0);
    setRunning(true);
  };

  // Spawn a nurse every few seconds
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        if (gameEngine && running) {
          // Create a new nurse entity at a random horizontal position
          const nurseId = `nurse-${Date.now()}`;
          const nurseX = Math.floor(Math.random() * (width - 40));
          
          gameEngine.dispatch({ type: 'add-entity', entity: {
            id: nurseId,
            position: [nurseX, 20],
            size: 20,
            speed: 50,
            renderer: <Nurse />
          }});
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [running, gameEngine]);

  // Spawn patients crossing the hallway
  useEffect(() => {
    if (running) {
      const patientInterval = setInterval(() => {
        if (gameEngine && running) {
          const patientId = `patient-${Date.now()}`;
          gameEngine.dispatch({
            type: 'add-entity',
            entity: {
              id: patientId,
              position: [-50, height / 2 + Math.random() * 200 - 100],
              width: 40,
              height: 40,
              speed: 50,
              renderer: <Obstacle />
            },
          });
        }
      }, 5000);
      
      return () => clearInterval(patientInterval);
    }
  }, [running, gameEngine]);

  // Define initial entities
  const getEntities = () => {
    return {
      game: {
        dispatch: (action) => {
          if (gameEngine) {
            gameEngine.dispatch(action);
          }
        }
      },
      syringe: { 
        position: [width / 2 - 20, height - 60], 
        renderer: <Syringe /> 
      },
      // Add some obstacles
      obstacle1: { 
        position: [width / 4, height / 2], 
        width: 50, 
        height: 80,
        renderer: <Obstacle width={50} height={80} />
      },
      obstacle2: { 
        position: [3 * width / 4 - 50, height / 2 + 100], 
        width: 50, 
        height: 80,
        renderer: <Obstacle width={50} height={80} />
      },
      // Background will be a simple view for now
      background: {
        position: [0, 0],
        width: width,
        height: height,
        renderer: <View style={styles.background} />
      }
    };
  };

  // Game event handling
  const onEvent = (e) => {
    if (e.type === 'game-over') {
      setRunning(false);
    } else if (e.type === 'score') {
      setScore(prev => prev + 1);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        style={styles.game}
        entities={getEntities()}
        systems={[MoveNurses, ShootSystem, TouchControls, MoveObstacles]}
        running={running}
        onEvent={onEvent}
      />
      
      {/* Score display */}
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
      </View>
      
      {/* Game over overlay */}
      {!running && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOver}>Game Over</Text>
          <Text style={styles.finalScore}>Score: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restart}>
            <Text style={styles.restartText}>Restart</Text>
          </TouchableOpacity>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    width: '100%',
    height: '100%'
  },
  game: { 
    flex: 1, 
    backgroundColor: '#eee',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e0e0e0'
  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20
  },
  gameOver: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  finalScore: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8
  },
  restartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});
