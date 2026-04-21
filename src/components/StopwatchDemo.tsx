import { useState } from 'react';
import { useTimer } from '../hooks';

interface LapTime {
  id: number;
  time: number;
  lapDuration: number;
}

const StopwatchDemo = () => {
  const { time, isRunning, start, pause, reset, toggle } = useTimer({
    initialTime: 0,
    autoStart: false,
  });

  const [laps, setLaps] = useState<LapTime[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    const lapDuration = time - lastLapTime;
    setLaps([
      { id: laps.length + 1, time, lapDuration },
      ...laps,
    ]);
    setLastLapTime(time);
  };

  const handleReset = () => {
    reset();
    setLaps([]);
    setLastLapTime(0);
  };

  const fastestLap = laps.length > 0 ? Math.min(...laps.map(l => l.lapDuration)) : 0;
  const slowestLap = laps.length > 0 ? Math.max(...laps.map(l => l.lapDuration)) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Chronomètre
      </h3>

      <div className="space-y-6">
        {/* Time Display */}
        <div className="p-12 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl text-center">
          <div className="text-6xl font-bold text-green-600 dark:text-green-400 font-mono">
            {formatTime(time)}
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-4">
            {isRunning ? '⏱️ En cours' : time > 0 ? '⏸ Pause' : '⏸ Prêt'}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-3">
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
            onClick={handleLap}
            disabled={!isRunning}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            🏁 Tour
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            🔄 Reset
          </button>
        </div>

        {/* Laps List */}
        {laps.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 dark:text-white">
              Tours ({laps.length})
            </h4>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {laps.map((lap) => (
                <div
                  key={lap.id}
                  className={`p-4 rounded-lg border-2 ${
                    lap.lapDuration === fastestLap && laps.length > 1
                      ? 'bg-green-100 dark:bg-green-900/20 border-green-500'
                      : lap.lapDuration === slowestLap && laps.length > 1
                      ? 'bg-red-100 dark:bg-red-900/20 border-red-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                        #{lap.id}
                      </span>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          Temps total
                        </div>
                        <div className="font-mono font-semibold text-gray-800 dark:text-white">
                          {formatTime(lap.time)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        Durée du tour
                      </div>
                      <div className={`font-mono font-bold text-lg ${
                        lap.lapDuration === fastestLap && laps.length > 1
                          ? 'text-green-600 dark:text-green-400'
                          : lap.lapDuration === slowestLap && laps.length > 1
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {formatTime(lap.lapDuration)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {laps.length === 0 && (
          <div className="p-8 bg-gray-100 dark:bg-gray-700/20 rounded-xl text-center">
            <div className="text-4xl mb-2">🏁</div>
            <p className="text-gray-600 dark:text-gray-400">
              Cliquez sur "Tour" pour enregistrer des temps
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopwatchDemo;