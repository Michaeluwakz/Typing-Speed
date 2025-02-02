export interface TestSettings {
  mode: 'automated' | 'manual';
  duration: 30 | 60 | 300; // seconds
  difficulty: 'easy' | 'medium' | 'hard';
  theme: 'light' | 'dark';
  font: 'mono' | 'sans' | 'serif';
}

export interface TestResult {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timestamp: number;
}

export interface TestState {
  currentText: string;
  userInput: string;
  timeLeft: number;
  isActive: boolean;
  mistakes: number;
  totalKeystrokes: number;
  startTime: number | null;
}