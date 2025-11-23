import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Screen = 'login' | 'dashboard' | 'history' | 'alerts' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
      {currentScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} />}
      {currentScreen === 'history' && <HistoryScreen onBack={handleBack} />}
      {currentScreen === 'alerts' && <AlertsScreen onBack={handleBack} />}
      {currentScreen === 'settings' && <SettingsScreen onBack={handleBack} onLogout={handleLogout} />}
    </div>
  );
}
