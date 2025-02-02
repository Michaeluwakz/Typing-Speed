import React, { useState, useEffect } from 'react';
import { TestSettings, TestResult } from './types';
import TestArea from './components/TestArea';
import Settings from './components/Settings';
import { Keyboard } from 'lucide-react';

function App() {
  const [settings, setSettings] = useState<TestSettings>({
    mode: 'automated',
    duration: 60,
    difficulty: 'medium',
    theme: 'light',
    font: 'mono'
  });

  const [results, setResults] = useState<TestResult[]>(() => {
    const saved = localStorage.getItem('typingResults');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('typingResults', JSON.stringify(results));
  }, [results]);

  const handleTestComplete = (wpm: number, accuracy: number) => {
    const newResult: TestResult = {
      wpm,
      accuracy,
      mistakes: 0,
      timestamp: Date.now()
    };
    setResults(prev => [...prev, newResult]);
  };

  return (
    <div className={`min-h-screen ${
      settings.theme === 'light' ? 'bg-gray-50' : 'bg-gray-900 text-white'
    }`}>
      <div className="container mx-auto py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Keyboard className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Typing Speed Test</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Improve your typing speed with real-time feedback
          </p>
        </header>

        <Settings settings={settings} onSettingsChange={setSettings} />
        <TestArea settings={settings} onTestComplete={handleTestComplete} />

        {results.length > 0 && (
          <div className="w-full max-w-4xl mx-auto p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Latest Result</h3>
                  <p>WPM: {results[results.length - 1].wpm}</p>
                  <p>Accuracy: {results[results.length - 1].accuracy}%</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Best Result</h3>
                  <p>WPM: {Math.max(...results.map(r => r.wpm))}</p>
                  <p>Accuracy: {Math.max(...results.map(r => r.accuracy))}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;