import { create } from 'zustand';
import axiosInstance from '../lib/api-client';
import { CurrentUser, SignUp } from '../interfaces/user';

type Store = {
  loading: boolean;
  checkingAuth: boolean;
  authUser: null | CurrentUser['user'];

  checkAuth: () => Promise<void>;
  signUp: (SignupData: SignUp) => Promise<void>;
};

const useAuthStore = create<Store>()((set) => ({
  loading: false,
  checkingAuth: false,
  authUser: null,
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get<CurrentUser>('/auth/profile');
      set({ authUser: res.data.user });
    } catch (err) {
      set({ authUser: null });
      console.log(err);
    } finally {
      set({ checkingAuth: false });
    }
  },
  signUp: async (signUpData: SignUp) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post<CurrentUser>(
        '/auth/signup',
        signUpData
      );
      set({ authUser: res.data.user });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  }
}));

export default useAuthStore;
