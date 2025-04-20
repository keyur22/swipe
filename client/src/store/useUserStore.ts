import { create } from 'zustand';
import axiosInstance from '../lib/api-client';
import { toast } from 'react-hot-toast';
import { updateProfileData, UserResponseData } from '../interfaces/user';
import useAuthStore from './useAuthStore';
import { isAxiosError } from 'axios';

type Store = {
  loading: boolean;
  updateProfile: (userData: updateProfileData) => Promise<void>;
};

const useUserStore = create<Store>()((set) => ({
  loading: false,
  updateProfile: async (userData: updateProfileData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.patch<UserResponseData>(
        '/users/update',
        userData
      );
      useAuthStore.getState().setAuthUser(res.data.user);
      toast.success('Profile updated successfully');
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
  }
}));

export default useUserStore;
