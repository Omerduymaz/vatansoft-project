export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 50;
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function validateUsername(username: string): string | null {
  if (!username) return 'Kullanıcı adı gerekli';
  if (username.length < USERNAME_MIN_LENGTH) {
    return `Kullanıcı adı en az ${USERNAME_MIN_LENGTH} karakter olmalıdır`;
  }
  if (username.length > USERNAME_MAX_LENGTH) {
    return `Kullanıcı adı en fazla ${USERNAME_MAX_LENGTH} karakter olmalıdır`;
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Şifre gerekli';
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalıdır`;
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return `Şifre en fazla ${PASSWORD_MAX_LENGTH} karakter olmalıdır`;
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return 'E-posta adresi gerekli';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Geçerli bir e-posta adresi giriniz';
  }
  
  return null;
}