import { create } from 'zustand';
import axiosInstance from '../lib/api-client';

type Store = {
  authUser: null;
  checkAuth: () => Promise<void>;
};

const useAuthStore = create<Store>()(() => ({
  authUser: null,
  checkAuth: async () => {
    try {
      const loggedInUser = await axiosInstance.get('/auth/profile');
      console.log(loggedInUser);
    } catch (err) {
      console.log(err);
    }
  }
}));

export default useAuthStore;
