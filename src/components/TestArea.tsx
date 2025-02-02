import React, { useEffect, useState, useCallback } from 'react';
import { TestSettings, TestState } from '../types';
import { generateTest, calculateWPM, calculateAccuracy } from '../utils/testGenerator';
import { Timer, RefreshCw } from 'lucide-react';

interface Props {
  settings: TestSettings;
  onTestComplete: (wpm: number, accuracy: number) => void;
}

export default function TestArea({ settings, onTestComplete }: Props) {
  const [state, setState] = useState<TestState>({
    currentText: '',
    userInput: '',
    timeLeft: settings.duration,
    isActive: false,
    mistakes: 0,
    totalKeystrokes: 0,
    startTime: null,
  });

  const resetTest = useCallback(() => {
    const newText = settings.mode === 'automated' 
      ? generateTest(settings.difficulty)
      : '';
    setState({
      currentText: newText,
      userInput: '',
      timeLeft: settings.duration,
      isActive: false,
      mistakes: 0,
      totalKeystrokes: 0,
      startTime: null,
    });
  }, [settings]);

  useEffect(() => {
    resetTest();
  }, [settings, resetTest]);

  useEffect(() => {
    let timer: number;
    if (state.isActive && state.timeLeft > 0) {
      timer = window.setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      const wpm = calculateWPM(
        state.totalKeystrokes,
        state.mistakes,
        settings.duration
      );
      const accuracy = calculateAccuracy(
        state.totalKeystrokes,
        state.mistakes
      );
      onTestComplete(wpm, accuracy);
    }
    return () => clearInterval(timer);
  }, [state.isActive, state.timeLeft, settings.duration, onTestComplete]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (!state.isActive && input.length === 1) {
      setState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now()
      }));
    }

    const isCorrect = state.currentText.startsWith(input);
    setState(prev => ({
      ...prev,
      userInput: input,
      mistakes: prev.mistakes + (isCorrect ? 0 : 1),
      totalKeystrokes: prev.totalKeystrokes + 1
    }));
  };

  const handleManualTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('customText') as HTMLTextAreaElement;
    setState(prev => ({
      ...prev,
      currentText: input.value,
      userInput: ''
    }));
    form.reset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {settings.mode === 'manual' && !state.currentText && (
        <form onSubmit={handleManualTextSubmit} className="space-y-4">
          <textarea
            name="customText"
            placeholder="Paste your custom text here..."
            className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Set Custom Text
          </button>
        </form>
      )}

      {state.currentText && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Timer className="w-5 h-5 text-blue-500" />
              <span className="text-xl font-mono">
                {Math.floor(state.timeLeft / 60)}:
                {(state.timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <button
              onClick={resetTest}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>

          <div className={`p-6 rounded-lg bg-white shadow-lg font-${settings.font} border border-gray-200`}>
            <p className="text-lg leading-relaxed">
              {state.currentText.split('').map((char, index) => {
                const userChar = state.userInput[index];
                let color = 'text-gray-600';
                if (userChar != null) {
                  color = userChar === char ? 'text-green-500' : 'text-red-500';
                }
                return (
                  <span key={index} className={color}>
                    {char}
                  </span>
                );
              })}
            </p>
          </div>

          <textarea
            value={state.userInput}
            onChange={handleInput}
            className={`w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-${settings.font}`}
            placeholder="Start typing..."
            disabled={state.timeLeft === 0}
          />

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div>WPM: {calculateWPM(state.totalKeystrokes, state.mistakes, 
                settings.duration - state.timeLeft)}</div>
              <div>Accuracy: {calculateAccuracy(state.totalKeystrokes, 
                state.mistakes)}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}