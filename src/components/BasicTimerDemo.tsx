import { useTimer } from '../hooks';

const BasicTimerDemo = () => {
  const { time, isRunning, start, pause, reset, toggle } = useTimer({
    initialTime: 0,
    autoStart: false,
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Timer Basique
      </h3>

      <div className="space-y-6">
        {/* Time Display */}
        <div className="p-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl text-center">
          <div className="text-7xl font-bold text-blue-600 dark:text-blue-400 font-mono">
            {formatTime(time)}
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-4">
            {isRunning ? '▶ En cours' : '⏸ Pause'}
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

        {/* Additional Controls */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={start}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            Start
          </button>
          <button
            onClick={pause}
            disabled={!isRunning}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            Pause
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            Reset
          </button>
        </div>

        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            💡 Timer simple qui compte les secondes à partir de 0
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicTimerDemo;