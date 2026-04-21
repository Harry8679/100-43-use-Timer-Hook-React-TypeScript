import { useState } from 'react';
import { useTimer } from '../hooks';

const CountdownDemo = () => {
  const [targetTime, setTargetTime] = useState(60);
  const [showComplete, setShowComplete] = useState(false);

  const { time, isRunning, reset, toggle, setTime } = useTimer({
    initialTime: targetTime,
    countDown: true,
    onComplete: () => {
      setShowComplete(true);
      setTimeout(() => setShowComplete(false), 3000);
    },
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetTime = (seconds: number) => {
    setTargetTime(seconds);
    setTime(seconds);
  };

  const percentage = targetTime > 0 ? (time / targetTime) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Compte à Rebours
      </h3>

      <div className="space-y-6">
        {/* Completion Alert */}
        {showComplete && (
          <div className="p-4 bg-green-500 text-white rounded-lg font-bold text-center animate-scale-in">
            🎉 Temps écoulé !
          </div>
        )}

        {/* Time Display with Progress Ring */}
        <div className="relative p-12 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl text-center">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-t-xl overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                time <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className={`text-7xl font-bold font-mono ${
            time <= 10 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-orange-600 dark:text-orange-400'
          }`}>
            {formatTime(time)}
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-4">
            {isRunning ? '⏱️ En cours' : '⏸ Pause'}
          </div>
        </div>

        {/* Quick Time Buttons */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Temps prédéfinis :
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[30, 60, 120, 300].map((seconds) => (
              <button
                key={seconds}
                onClick={() => handleSetTime(seconds)}
                disabled={isRunning}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors text-sm"
              >
                {seconds < 60 ? `${seconds}s` : `${seconds / 60}m`}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={toggle}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isRunning
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownDemo;