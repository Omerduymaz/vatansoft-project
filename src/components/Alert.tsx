import React from 'react';

interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  const baseClasses = 'p-4 mb-4 rounded-lg text-sm';
  const typeClasses = {
    error: 'bg-red-100 text-red-700',
    success: 'bg-green-100 text-green-700',
    info: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
}