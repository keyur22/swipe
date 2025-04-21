import { create } from 'zustand';
import axiosInstance from '../lib/api-client';
import { UserResponseData, UserData } from '../interfaces/user';
import { LoginData, SignUpData } from '../interfaces/auth';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

interface Store {
  loading: boolean;
  checkingAuth: boolean;
  authUser: null | UserData;

  checkAuth: () => Promise<void>;
  signUp: (SignupData: SignUpData) => Promise<void>;
  login: (LoginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  setAuthUser: (user: UserData) => void;
}

const useAuthStore = create<Store>()((set) => ({
  loading: false,
  checkingAuth: false,
  authUser: null,

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get<UserResponseData>('/auth/myProfile');
      set({ authUser: res.data.user });
    } catch (err) {
      console.log(err);
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  signUp: async (signUpData: SignUpData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post<UserResponseData>(
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

  login: async (loginData: LoginData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post<UserResponseData>(
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
  },

  setAuthUser: (user: UserData) => set({ authUser: user })
}));

export default useAuthStore;
