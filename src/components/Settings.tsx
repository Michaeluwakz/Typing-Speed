import React from 'react';
import { TestSettings } from '../types';
import { Settings as SettingsIcon, Sun, Moon } from 'lucide-react';

interface Props {
  settings: TestSettings;
  onSettingsChange: (settings: TestSettings) => void;
}

export default function Settings({ settings, onSettingsChange }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Test Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mode
            </label>
            <select
              value={settings.mode}
              onChange={(e) => onSettingsChange({
                ...settings,
                mode: e.target.value as 'automated' | 'manual'
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="automated">Automated</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <select
              value={settings.duration}
              onChange={(e) => onSettingsChange({
                ...settings,
                duration: Number(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={300}>5 minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              value={settings.difficulty}
              onChange={(e) => onSettingsChange({
                ...settings,
                difficulty: e.target.value as 'easy' | 'medium' | 'hard'
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={settings.mode === 'manual'}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Font Style
            </label>
            <select
              value={settings.font}
              onChange={(e) => onSettingsChange({
                ...settings,
                font: e.target.value as 'mono' | 'sans' | 'serif'
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="mono">Monospace</option>
              <option value="sans">Sans-serif</option>
              <option value="serif">Serif</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onSettingsChange({
              ...settings,
              theme: settings.theme === 'light' ? 'dark' : 'light'
            })}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {settings.theme === 'light' ? (
              <Moon className="w-4 h-4 mr-2" />
            ) : (
              <Sun className="w-4 h-4 mr-2" />
            )}
            {settings.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}