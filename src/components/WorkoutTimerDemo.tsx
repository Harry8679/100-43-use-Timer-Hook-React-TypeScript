import { useState } from 'react';
import { useTimer } from '../hooks';
import type { WorkoutExercise } from '../types';

const WorkoutTimerDemo = () => {
  const exercises: WorkoutExercise[] = [
    { id: '1', name: 'Pompes', duration: 30, rest: 10, sets: 3 },
    { id: '2', name: 'Squats', duration: 40, rest: 15, sets: 3 },
    { id: '3', name: 'Planche', duration: 30, rest: 10, sets: 3 },
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];
  const initialTime = isResting ? currentExercise.rest : currentExercise.duration;

  const { time, isRunning, start, pause, reset, setTime } = useTimer({
    initialTime,
    countDown: true,
    onComplete: () => {
      if (isResting) {
        // Rest complete, move to next set or exercise
        if (currentSet < currentExercise.sets) {
          setCurrentSet(currentSet + 1);
          setIsResting(false);
          setTime(currentExercise.duration);
        } else if (currentExerciseIndex < exercises.length - 1) {
          setCurrentExerciseIndex(currentExerciseIndex + 1);
          setCurrentSet(1);
          setIsResting(false);
          setTime(exercises[currentExerciseIndex + 1].duration);
        } else {
          setWorkoutComplete(true);
        }
      } else {
        // Exercise complete, start rest
        setIsResting(true);
        setTime(currentExercise.rest);
      }
    },
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    reset();
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsResting(false);
    setWorkoutComplete(false);
    setTime(exercises[0].duration);
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSets = exercises
    .slice(0, currentExerciseIndex)
    .reduce((acc, ex) => acc + ex.sets, 0) + (currentSet - 1);
  const progress = (completedSets / totalSets) * 100;

  if (workoutComplete) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Timer Workout
        </h3>

        <div className="p-12 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
            Workout Terminé !
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Excellent travail ! Tu as complété tous les exercices.
          </p>
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-colors"
          >
            🔄 Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Timer Workout
      </h3>

      <div className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Exercise */}
        <div className={`p-8 rounded-xl text-center ${
          isResting
            ? 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20'
            : 'bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20'
        }`}>
          <div className="text-5xl mb-4">{isResting ? '💆' : '💪'}</div>
          <h4 className={`text-3xl font-bold mb-2 ${
            isResting ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'
          }`}>
            {isResting ? 'Repos' : currentExercise.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Série {currentSet} / {currentExercise.sets}
          </p>

          <div className={`text-7xl font-bold font-mono mb-4 ${
            isResting ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'
          } ${time <= 5 ? 'animate-pulse' : ''}`}>
            {formatTime(time)}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={isRunning ? pause : start}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isRunning
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            🔄 Reset
          </button>
        </div>

        {/* Exercise List */}
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800 dark:text-white">Programme :</h4>
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                index === currentExerciseIndex
                  ? 'bg-orange-100 dark:bg-orange-900/20 border-orange-500 scale-105'
                  : index < currentExerciseIndex
                  ? 'bg-green-100 dark:bg-green-900/20 border-green-500'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {index < currentExerciseIndex ? '✅' : index === currentExerciseIndex ? '▶️' : '⏳'}
                  </span>
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white">
                      {exercise.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.sets} séries × {exercise.duration}s (repos: {exercise.rest}s)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimerDemo;