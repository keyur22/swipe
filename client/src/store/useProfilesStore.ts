import { create } from 'zustand';

import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/api-client';
import { Profile, ProfilesResponse } from '../interfaces/profiles';

interface Store {
  loading: boolean;
  profiles: Profile[];
  swipeFeedback: null | 'passed' | 'liked';
  getProfiles: () => Promise<void>;
  swipeLeft: (dislikedUserId: string) => Promise<void>;
  swipeRight: (likedUserId: string) => Promise<void>;
}

const useProfilesStore = create<Store>()((set, get) => ({
  loading: false,
  profiles: [],
  swipeFeedback: null,
  getProfiles: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get<ProfilesResponse>(
        '/matches/user-profiles'
      );
      set({ profiles: res.data.users });
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
  swipeLeft: async (dislikedUserId: string) => {
    try {
      set({ swipeFeedback: 'passed' });
      await axiosInstance.get('/matches/swipe-left/' + dislikedUserId);
      // await get().getProfiles();
    } catch (error) {
      console.log(error);
      toast.error('Failed to swipe left');
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },
  swipeRight: async (likedUserId: string) => {
    try {
      set({ swipeFeedback: 'liked' });
      await axiosInstance.get('/matches/swipe-right/' + likedUserId);
      // await get().getProfiles();
    } catch (error) {
      console.log(error);
      toast.error('Failed to swipe right');
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  }
}));

export default useProfilesStore;
