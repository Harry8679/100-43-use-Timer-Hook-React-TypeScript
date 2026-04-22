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

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Countdown</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Compte à rebours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Stopwatch</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chronomètre avec tours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Auto-start</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Démarrage automatique
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Callbacks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    onComplete, onTick
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Controls</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Play/Pause/Reset/Toggle
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Interval</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Intervalle configurable
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Pomodoro</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Technique de productivité
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Type-Safe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    100% TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              💻 Exemples d'utilisation
            </h2>

            <div className="space-y-6">
              {/* Basic Timer */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Timer basique :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { useTimer } from './hooks';

const { time, isRunning, start, pause, reset, toggle } = useTimer({
  initialTime: 0,
  autoStart: false,
});

// time: nombre de secondes
// isRunning: boolean indiquant si le timer est actif
// start, pause, reset, toggle: fonctions de contrôle`}
                </pre>
              </div>

              {/* Countdown */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Compte à rebours :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const { time, isRunning, start, pause } = useTimer({
  initialTime: 60,
  countDown: true,
  onComplete: () => {
    console.log('Temps écoulé !');
    // Jouer un son, afficher une notification, etc.
  },
});

return (
  <div>
    <h1>{time}s restantes</h1>
    <button onClick={start}>Start</button>
  </div>
);`}
                </pre>
              </div>

              {/* With Callbacks */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Avec callbacks :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const { time, isRunning, start } = useTimer({
  initialTime: 120,
  countDown: true,
  onComplete: () => {
    alert('Timer terminé !');
  },
  onTick: (currentTime) => {
    if (currentTime === 30) {
      console.log('Plus que 30 secondes !');
    }
  },
});`}
                </pre>
              </div>

              {/* Auto-start */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Démarrage automatique :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const { time, pause } = useTimer({
  initialTime: 300,
  countDown: true,
  autoStart: true, // Démarre automatiquement
});

// Le timer démarre dès le montage du composant`}
                </pre>
              </div>

              {/* Custom Interval */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Intervalle personnalisé :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const { time, start } = useTimer({
  initialTime: 0,
  interval: 100, // Mise à jour toutes les 100ms (0.1s)
});

// Utile pour des chronomètres précis avec millisecondes`}
                </pre>
              </div>

              {/* Pomodoro */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Pomodoro technique :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const [phase, setPhase] = useState<'work' | 'break'>('work');

const durations = {
  work: 25 * 60,
  break: 5 * 60,
};

const { time, isRunning, start, setTime } = useTimer({
  initialTime: durations.work,
  countDown: true,
  onComplete: () => {
    if (phase === 'work') {
      setPhase('break');
      setTime(durations.break);
    } else {
      setPhase('work');
      setTime(durations.work);
    }
  },
});`}
                </pre>
              </div>

              {/* Format Time */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Formatage du temps :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
};

const formatTimeWithHours = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return \`\${hours.toString().padStart(2, '0')}:\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
};`}
                </pre>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">🎯 Cas d'usage courants</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>⏱️</span> Productivité
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Pomodoro technique</li>
                  <li>• Time blocking</li>
                  <li>• Focus sessions</li>
                  <li>• Break reminders</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>🏋️</span> Fitness
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Workout intervals</li>
                  <li>• Rest periods</li>
                  <li>• HIIT timers</li>
                  <li>• Tabata training</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>📝</span> Quiz & Tests
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Exam timers</li>
                  <li>• Question timers</li>
                  <li>• Speed tests</li>
                  <li>• Time limits</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span>🔐</span> Sécurité
                </h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Session timeouts</li>
                  <li>• Inactivity detection</li>
                  <li>• Auto-logout</li>
                  <li>• Token expiration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDemo;