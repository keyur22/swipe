import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import axiosInstance from '../lib/api-client';
import { Match, MatchesResponse } from '../interfaces/matches';

interface Store {
  loading: boolean;
  matches: Match[];
  getMatches: () => Promise<void>;
}

const useMatchStore = create<Store>()((set) => ({
  loading: false,
  matches: [],
  getMatches: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get<MatchesResponse>('/matches');
      set({ matches: res.data.matches });
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

export default useMatchStore;
