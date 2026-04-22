import { useState, useEffect } from 'react';
import { useTimer } from '../hooks';

const SessionTimeoutDemo = () => {
  const sessionDuration = 120; // 2 minutes
  const warningTime = 30; // Show warning at 30s
  const [showWarning, setShowWarning] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const { time, isRunning, start, reset, setTime } = useTimer({
    initialTime: sessionDuration,
    countDown: true,
    autoStart: true,
    onComplete: () => {
      setIsLoggedOut(true);
    },
    onTick: (currentTime) => {
      if (currentTime === warningTime) {
        setShowWarning(true);
      }
    },
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleActivity = () => {
    setLastActivity(Date.now());
    setShowWarning(false);
    setTime(sessionDuration);
  };

  const handleLogout = () => {
    setIsLoggedOut(true);
    setShowWarning(false);
  };

  const handleLogin = () => {
    setIsLoggedOut(false);
    setShowWarning(false);
    setTime(sessionDuration);
    start();
  };

  // Simulate activity detection
  useEffect(() => {
    if (isLoggedOut) return;

    const handleUserActivity = () => {
      if (!isLoggedOut) {
        handleActivity();
      }
    };

    // Disabled to allow manual testing
    // window.addEventListener('mousemove', handleUserActivity);
    // window.addEventListener('keypress', handleUserActivity);
    // window.addEventListener('click', handleUserActivity);

    return () => {
      // window.removeEventListener('mousemove', handleUserActivity);
      // window.removeEventListener('keypress', handleUserActivity);
      // window.removeEventListener('click', handleUserActivity);
    };
  }, [isLoggedOut]);

  if (isLoggedOut) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Session Timeout
        </h3>

        <div className="p-12 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl text-center">
          <div className="text-8xl mb-6">🔒</div>
          <h2 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
            Session expirée
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Votre session a expiré en raison d'inactivité. Veuillez vous reconnecter.
          </p>
          <button
            onClick={handleLogin}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-lg transition-colors"
          >
            🔑 Se reconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Session Timeout
      </h3>

      <div className="space-y-6">
        {/* Warning Banner */}
        {showWarning && (
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg animate-scale-in">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">⚠️</span>
              <div className="flex-1">
                <div className="font-bold text-yellow-800 dark:text-yellow-400">
                  Attention !
                </div>
                <p className="text-yellow-700 dark:text-yellow-500 text-sm">
                  Votre session va expirer dans {time} secondes. Cliquez sur "Rester connecté" pour continuer.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Session Status */}
        <div className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">👤</span>
              <div>
                <div className="font-bold text-gray-800 dark:text-white">
                  Session active
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Utilisateur connecté
                </div>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Temps restant</span>
                <span className={`font-bold ${time <= warningTime ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {formatTime(time)}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    time <= warningTime ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(time / sessionDuration) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-gray-500 dark:text-gray-500 mb-1">
                  Durée totale
                </div>
                <div className="font-bold text-gray-800 dark:text-white">
                  {formatTime(sessionDuration)}
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-gray-500 dark:text-gray-500 mb-1">
                  Avertissement
                </div>
                <div className="font-bold text-gray-800 dark:text-white">
                  {formatTime(warningTime)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Simulator */}
        <div className="space-y-3">
          <h4 className="font-bold text-gray-800 dark:text-white">Simulateur d'activité :</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleActivity}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              ✋ Rester connecté
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            >
              🚪 Se déconnecter
            </button>
          </div>
        </div>

        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-700 dark:text-purple-400">
            💡 En production, l'activité (mouvements de souris, clics, touches clavier) réinitialiserait automatiquement le timer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutDemo;