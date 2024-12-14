import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { validateUsername, validatePassword } from '../utils/validation';
import { authService } from '../utils/auth';
import { Alert } from './Alert';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onLogin, onForgotPassword }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate inputs
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError && passwordError) {
      setError('Kullanıcı adı ve şifre gerekli');
      return;
    }
    if (usernameError) {
      setError(usernameError);
      return;
    }
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Attempt login
    const result = await authService.login(username, password);
    if (result.success) {
      setSuccess(result.message);
      onLogin(username, password);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Giriş Yap</h2>
      
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Kullanıcı Adı *
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Şifre *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
            <span className="ml-2 text-gray-700">Beni Hatırla</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Giriş Yap
        </button>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Şifremi Unuttum
          </button>
        </div>
      </form>
    </div>
  );
}