import { create } from 'zustand';
import { Match } from '../interfaces/matches';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/api-client';
import { ProfilesResponse } from '../interfaces/profiles';

interface Store {
  loading: boolean;
  profiles: Match[];
  getProfiles: () => Promise<void>;
}

const useProfilesStore = create<Store>()((set) => ({
  loading: false,
  profiles: [],
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
  }
}));

export default useProfilesStore;
