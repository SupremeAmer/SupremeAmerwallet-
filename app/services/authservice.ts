import { account } from '@lib/appwriteService';

export const AuthService = {
  register: async (email: string, password: string) => {
    return account.create(email, email, password);
  },
  login: async (email: string, password: string) => {
    return account.createEmailSession(email, password);
  },
  getCurrentUser: async () => {
    return account.get();
  },
  logout: async () => {
    return account.deleteSession('current');
  },
};