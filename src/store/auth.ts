import { create } from 'zustand';

// Dummy demo credentials — there is no real backend wired up yet.
export const DEMO_CREDENTIALS = {
  email: 'demo@tallio.com',
  password: 'Tallio@123',
};

type AuthState = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (email, password) => {
    const isValid =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password;
    if (isValid) {
      set({ isAuthenticated: true });
    }
    return isValid;
  },
  logout: () => set({ isAuthenticated: false }),
}));
