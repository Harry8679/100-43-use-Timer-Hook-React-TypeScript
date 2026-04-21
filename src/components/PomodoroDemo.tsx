import { useState } from 'react';
import { useTimer } from '../hooks';

type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

const PomodoroDemo = () => {
  const [phase, setPhase] = useState<PomodoroPhase>('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const durations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const { time, isRunning, pause, reset, toggle, setTime } = useTimer({
    initialTime: durations[phase],
    countDown: true,
    onComplete: () => {
      // Auto-switch to next phase
      if (phase === 'work') {
        const newPomodoros = completedPomodoros + 1;
        setCompletedPomodoros(newPomodoros);
        
        // Every 4 pomodoros, take a long break
        const nextPhase = newPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak';
        setPhase(nextPhase);
        setTime(durations[nextPhase]);
      } else {
        setPhase('work');
        setTime(durations.work);
      }
    },
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePhaseChange = (newPhase: PomodoroPhase) => {
    setPhase(newPhase);
    setTime(durations[newPhase]);
    pause();
  };

  const handleReset = () => {
    reset();
    setPhase('work');
    setCompletedPomodoros(0);
    setTime(durations.work);
  };

  const percentage = (time / durations[phase]) * 100;

  const phaseConfig = {
    work: {
      label: 'Travail',
      emoji: '💼',
      color: 'from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20',
      textColor: 'text-red-600 dark:text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-600',
    },
    shortBreak: {
      label: 'Pause Courte',
      emoji: '☕',
      color: 'from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      buttonColor: 'bg-green-500 hover:bg-green-600',
    },
    longBreak: {
      label: 'Pause Longue',
      emoji: '🌴',
      color: 'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Pomodoro Timer
      </h3>

      <div className="space-y-6">
        {/* Pomodoros Completed */}
        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Pomodoros complétés aujourd'hui :
            </span>
            <div className="flex items-center gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < (completedPomodoros % 4)
                      ? 'bg-purple-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
              <span className="ml-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                {completedPomodoros}
              </span>
            </div>
          </div>
        </div>

        {/* Phase Selector */}
        <div className="grid grid-cols-3 gap-2">
          {(['work', 'shortBreak', 'longBreak'] as PomodoroPhase[]).map((p) => (
            <button
              key={p}
              onClick={() => handlePhaseChange(p)}
              disabled={isRunning}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                phase === p
                  ? phaseConfig[p].buttonColor + ' text-white scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-2xl mb-1">{phaseConfig[p].emoji}</div>
              <div className="text-xs">{phaseConfig[p].label}</div>
            </button>
          ))}
        </div>

        {/* Time Display */}
        <div className={`relative p-12 bg-gradient-to-br ${phaseConfig[phase].color} rounded-xl text-center`}>
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-t-xl overflow-hidden">
            <div
              className={`h-full ${phaseConfig[phase].buttonColor} transition-all duration-1000`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="text-4xl mb-4">{phaseConfig[phase].emoji}</div>
          <div className={`text-7xl font-bold font-mono ${phaseConfig[phase].textColor}`}>
            {formatTime(time)}
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-4 font-semibold">
            {phaseConfig[phase].label}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={toggle}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isRunning
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : phaseConfig[phase].buttonColor + ' text-white'
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

        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            💡 <strong>Technique Pomodoro :</strong> 25 min de travail, 5 min de pause. Après 4 pomodoros, pause longue de 15 min.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroDemo;