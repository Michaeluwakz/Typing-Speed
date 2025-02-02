// Word lists for different difficulty levels
const easyWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she'
];

const mediumWords = [
  'computer', 'program', 'interface', 'developer', 'software',
  'database', 'network', 'system', 'application', 'technology',
  'function', 'website', 'browser', 'keyboard', 'internet',
  'digital', 'coding', 'testing', 'design', 'mobile'
];

const hardWords = [
  'sophisticated', 'implementation', 'authentication', 'infrastructure',
  'optimization', 'architectural', 'compatibility', 'functionality',
  'development', 'professional', 'experience', 'environment',
  'performance', 'application', 'programming', 'technology'
];

export const generateTest = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  const words = {
    easy: easyWords,
    medium: mediumWords,
    hard: hardWords
  }[difficulty];

  const sentenceLength = {
    easy: 8,
    medium: 6,
    hard: 4
  }[difficulty];

  return Array.from({ length: sentenceLength }, () => 
    words[Math.floor(Math.random() * words.length)]
  ).join(' ') + '.';
};

export const calculateWPM = (
  totalKeystrokes: number,
  mistakes: number,
  timeElapsed: number
): number => {
  const minutes = timeElapsed / 60;
  const words = (totalKeystrokes / 5) - mistakes; // Standard: 5 keystrokes = 1 word
  return Math.max(Math.round(words / minutes), 0);
};

export const calculateAccuracy = (
  totalKeystrokes: number,
  mistakes: number
): number => {
  if (totalKeystrokes === 0) return 100;
  return Math.max(Math.round(((totalKeystrokes - mistakes) / totalKeystrokes) * 100), 0);
};