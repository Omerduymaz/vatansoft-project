import { MAX_LOGIN_ATTEMPTS, LOCKOUT_DURATION } from './validation';

interface AuthState {
  loginAttempts: number;
  lastAttemptTime: number;
  isLocked: boolean;
}

const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
};

class AuthService {
  private state: AuthState = {
    loginAttempts: 0,
    lastAttemptTime: 0,
    isLocked: false
  };

  private checkLockout(): boolean {
    if (this.state.isLocked) {
      const timeSinceLastAttempt = Date.now() - this.state.lastAttemptTime;
      if (timeSinceLastAttempt >= LOCKOUT_DURATION) {
        this.resetLockout();
        return false;
      }
      return true;
    }
    return false;
  }

  private resetLockout() {
    this.state = {
      loginAttempts: 0,
      lastAttemptTime: 0,
      isLocked: false
    };
  }

  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    if (this.checkLockout()) {
      const remainingTime = Math.ceil((LOCKOUT_DURATION - (Date.now() - this.state.lastAttemptTime)) / 1000);
      return {
        success: false,
        message: `Çok fazla hatalı giriş. Lütfen ${remainingTime} saniye sonra tekrar deneyin.`
      };
    }

    this.state.lastAttemptTime = Date.now();

    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      this.resetLockout();
      return { success: true, message: 'Giriş başarılı' };
    }

    this.state.loginAttempts++;

    if (this.state.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      this.state.isLocked = true;
      return {
        success: false,
        message: 'Çok fazla hatalı giriş. Lütfen 5 dakika sonra tekrar deneyin.'
      };
    }

    return {
      success: false,
      message: 'Kullanıcı adı veya şifre hatalı'
    };
  }
}

export const authService = new AuthService();