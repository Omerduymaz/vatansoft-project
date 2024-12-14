import React, { useState } from 'react';
import { Alert } from './Alert';
import { validateEmail } from '../utils/validation';

interface PasswordResetFormProps {
  onBack: () => void;
}

export function PasswordResetForm({ onBack }: PasswordResetFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setMessage({ type: 'error', text: emailError });
      return;
    }

    // Simulate password reset email sending
    setMessage({ 
      type: 'success', 
      text: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin.' 
    });
    
    // In a real application, you would make an API call here
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Şifre Sıfırlama</h2>
      <p className="text-gray-600 text-center mb-8">
        Şifrenizi sıfırlamak için e-posta adresinizi girin.
      </p>

      {message && <Alert type={message.type} message={message.text} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            E-posta Adresi *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="ornek@email.com"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          Şifre Sıfırlama Bağlantısı Gönder
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Giriş Ekranına Dön
        </button>
      </form>
    </div>
  );
}