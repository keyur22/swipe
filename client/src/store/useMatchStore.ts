import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import axiosInstance from '../lib/api-client';
import { Match, MatchesResponse } from '../interfaces/matches';
import { getSocket } from '../socket/socket.client';

interface Store {
  loading: boolean;
  matches: Match[];
  getMatches: () => Promise<void>;
  subscribeToNewMatches: () => void;
  unsubscribeFromNewMatches: () => void;
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
  },
  subscribeToNewMatches: () => {
    try {
      const socket = getSocket();

      // newMatch event emitted from server
      socket.on('newMatch', (newMatch) => {
        set((state) => ({
          matches: [...state.matches, newMatch]
        }));
        toast.success('You got a new match!');
      });
    } catch (err) {
      console.log(err);
    }
  },
  unsubscribeFromNewMatches: () => {
    try {
      const socket = getSocket();
      socket.off('newMatch');
    } catch (err) {
      console.log(err);
    }
  }
}));

export default useMatchStore;
