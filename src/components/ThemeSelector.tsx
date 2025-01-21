import React from 'react';
import { Theme, defaultThemes } from '../types';
import { HexColorPicker } from 'react-colorful';

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  darkMode: boolean;
}

export default function ThemeSelector({ selectedTheme, onThemeChange, darkMode }: ThemeSelectorProps) {
  const [showCustomizer, setShowCustomizer] = React.useState(false);
  const [customTheme, setCustomTheme] = React.useState<Theme>({
    id: 'custom',
    name: 'Custom',
    bgColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#3B82F6'
  });

  const handleCustomThemeChange = (color: string, type: 'bgColor' | 'textColor' | 'accentColor') => {
    const newTheme = { ...customTheme, [type]: color };
    setCustomTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className={`space-y-6 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md transition-colors duration-200`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Choose Theme</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {defaultThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTheme.id === theme.id
                ? 'border-blue-500 shadow-md'
                : `border-gray-200 hover:border-blue-300 ${darkMode ? 'hover:border-blue-400' : ''}`
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className="w-full h-20 rounded-md"
                style={{ backgroundColor: theme.bgColor }}
              >
                <div className="h-full flex items-center justify-center">
                  <span style={{ color: theme.textColor }}>{theme.name}</span>
                </div>
              </div>
            </div>
          </button>
        ))}

        <button
          onClick={() => setShowCustomizer(!showCustomizer)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTheme.id === 'custom'
              ? 'border-blue-500 shadow-md'
              : `border-gray-200 hover:border-blue-300 ${darkMode ? 'hover:border-blue-400' : ''}`
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div
              className="w-full h-20 rounded-md"
              style={{ backgroundColor: customTheme.bgColor }}
            >
              <div className="h-full flex items-center justify-center">
                <span style={{ color: customTheme.textColor }}>Custom</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {showCustomizer && (
        <div className="mt-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              Background Color
            </label>
            <HexColorPicker
              color={customTheme.bgColor}
              onChange={(color) => handleCustomThemeChange(color, 'bgColor')}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              Text Color
            </label>
            <HexColorPicker
              color={customTheme.textColor}
              onChange={(color) => handleCustomThemeChange(color, 'textColor')}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              Accent Color
            </label>
            <HexColorPicker
              color={customTheme.accentColor}
              onChange={(color) => handleCustomThemeChange(color, 'accentColor')}
            />
          </div>
        </div>
      )}
    </div>
  );
}