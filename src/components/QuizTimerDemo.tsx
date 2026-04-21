import { useState } from 'react';
import { useTimer } from '../hooks';
import type { QuizQuestion } from '../types';

const QuizTimerDemo = () => {
  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'Quelle est la capitale de la France ?',
      options: ['Paris', 'Londres', 'Berlin', 'Madrid'],
      correctAnswer: 0,
    },
    {
      id: '2',
      question: 'Combien font 7 × 8 ?',
      options: ['54', '56', '58', '60'],
      correctAnswer: 1,
    },
    {
      id: '3',
      question: 'Quel est le plus grand océan ?',
      options: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'],
      correctAnswer: 3,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const timePerQuestion = 15;

  const { time, isRunning, start, pause, reset: resetTimer, setTime } = useTimer({
    initialTime: timePerQuestion,
    countDown: true,
    autoStart: true,
    onComplete: () => {
      handleNextQuestion();
    },
  });

  const formatTime = (seconds: number): string => {
    return seconds.toString().padStart(2, '0');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isRunning) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTime(timePerQuestion);
    } else {
      setIsQuizComplete(true);
      pause();
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizComplete(false);
    setAnswers(Array(questions.length).fill(null));
    setTime(timePerQuestion);
    start();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const percentage = (time / timePerQuestion) * 100;

  if (isQuizComplete) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Quiz Timer
        </h3>

        <div className="space-y-6">
          <div className="p-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl text-center">
            <div className="text-8xl mb-6">
              {score === questions.length ? '🏆' : score >= questions.length / 2 ? '🎉' : '📚'}
            </div>
            <h2 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
              Quiz Terminé !
            </h2>
            <div className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
              {score} / {questions.length}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              {score === questions.length
                ? 'Parfait ! 🌟'
                : score >= questions.length / 2
                ? 'Bien joué ! 👍'
                : 'Continue à réviser ! 💪'}
            </p>
          </div>

          {/* Review Answers */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 dark:text-white">Révision :</h4>
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? 'bg-green-100 dark:bg-green-900/20 border-green-500'
                      : 'bg-red-100 dark:bg-red-900/20 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 dark:text-white mb-2">
                        {question.question}
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600 dark:text-gray-400">
                          Votre réponse :{' '}
                          <span className={isCorrect ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'}>
                            {userAnswer !== null ? question.options[userAnswer] : 'Pas de réponse'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-green-600 dark:text-green-400">
                            Bonne réponse : <span className="font-semibold">{question.options[question.correctAnswer]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="w-full px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold text-lg transition-colors"
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
        Quiz Timer
      </h3>

      <div className="space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
            Score: {score}
          </span>
        </div>

        {/* Timer */}
        <div className="relative">
          <div className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl text-center">
            <div className={`text-6xl font-bold font-mono ${
              time <= 5 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-purple-600 dark:text-purple-400'
            }`}>
              {formatTime(time)}s
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-b-xl overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                time <= 5 ? 'bg-red-500' : 'bg-purple-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            {currentQuestion.question}
          </h4>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={!isRunning}
                className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition-all ${
                  selectedAnswer === index
                    ? 'bg-purple-500 border-purple-600 text-white scale-105'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:border-purple-500 dark:hover:border-purple-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    selectedAnswer === index
                      ? 'bg-white text-purple-500'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null || !isRunning}
          className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
        >
          {currentQuestionIndex < questions.length - 1 ? '➡️ Question suivante' : '✅ Terminer'}
        </button>

        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            💡 Tu as {timePerQuestion} secondes par question. Choisis ta réponse avant la fin du temps !
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizTimerDemo;