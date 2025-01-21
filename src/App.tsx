import React, { useState, useEffect } from 'react';
import BusinessCardForm from './components/BusinessCardForm';
import CardPreview from './components/CardPreview';
import ThemeSelector from './components/ThemeSelector';
import { BusinessCard, Theme, defaultThemes } from './types';
import { QrCode, Sun, Moon } from 'lucide-react';

const initialCard: BusinessCard = {
  name: '',
  jobTitle: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  linkedin: '',
  twitter: '',
  github: '',
  profileImage: '',
  description: ''
};

function App() {
  const [card, setCard] = useState<BusinessCard>(initialCard);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultThemes[0]);
  const [previewMode, setPreviewMode] = useState<'qr' | 'full'>('qr');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <QrCode className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ScanCard</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BusinessCardForm card={card} onChange={setCard} darkMode={darkMode} />
            <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} darkMode={darkMode} />
          </div>

          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-colors duration-200`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Preview</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPreviewMode(previewMode === 'qr' ? 'full' : 'qr')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Show {previewMode === 'qr' ? 'Full Card' : 'QR Card'}
                  </button>
                </div>
              </div>
              
              <CardPreview card={card} theme={selectedTheme} mode={previewMode} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;