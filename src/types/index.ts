// Types pour timer - AUCUN ANY

export interface TimerConfig {
  initialTime: number;
  interval?: number;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (time: number) => void;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  duration: number;
  rest: number;
  sets: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}