import BasicTimerDemo from './BasicTimerDemo';
import CountdownDemo from './CountdownDemo';
import StopwatchDemo from './StopwatchDemo';
import PomodoroDemo from './PomodoroDemo';
import WorkoutTimerDemo from './WorkoutTimerDemo';
import QuizTimerDemo from './QuizTimerDemo';
import SessionTimeoutDemo from './SessionTimeoutDemo';

const TimerDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ⏱️ useTimer Hook
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 43/100 • Timer & Countdown Management
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Hook avancé pour gérer les timers, compteurs, et chronomètres
          </p>
        </div>

        {/* Demos */}
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <BasicTimerDemo />
            <CountdownDemo />
          </div>

          {/* Row 2 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <StopwatchDemo />
            <PomodoroDemo />
          </div>

          {/* Row 3 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <WorkoutTimerDemo />
            <QuizTimerDemo />
          </div>

          {/* Row 4 */}
          <SessionTimeoutDemo />

          {/* Features - Continue dans le prochain message */}
        </div>
      </div>
    </div>
  );
};

export default TimerDemo;