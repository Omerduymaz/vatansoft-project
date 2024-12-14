import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { PasswordResetForm } from './components/PasswordResetForm';
import { DogStats } from './components/DogStats';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleForgotPassword = () => {
    setShowPasswordReset(true);
  };

  const handleBackToLogin = () => {
    setShowPasswordReset(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!isLoggedIn ? (
        showPasswordReset ? (
          <PasswordResetForm onBack={handleBackToLogin} />
        ) : (
          <LoginForm onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
        )
      ) : (
        <DogStats />
      )}
    </div>
  );
}

export default App;