import { create } from 'zustand';
import axiosInstance from '../lib/api-client';
import { CurrentUser, Login, SignUp } from '../interfaces/user';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

type Store = {
  loading: boolean;
  checkingAuth: boolean;
  authUser: null | CurrentUser['user'];

  checkAuth: () => Promise<void>;
  signUp: (SignupData: SignUp) => Promise<void>;
  login: (LoginData: Login) => Promise<void>;
  logout: () => Promise<void>;
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
      console.log(err);
      set({ authUser: null });
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
      toast.success('Account created successfully');
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      set({ loading: false });
    }
  },
  login: async (loginData: Login) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post<CurrentUser>(
        '/auth/login',
        loginData
      );
      set({ authUser: res.data.user });
      toast.success('Logged in successfully');
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    }
  }
}));

export default useAuthStore;
