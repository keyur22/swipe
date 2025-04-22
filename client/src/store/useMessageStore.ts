import { create } from 'zustand';
import axiosInstance from '../lib/api-client';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Message, MessagesResponse } from '../interfaces/messages';
import { getSocket } from '../socket/socket.client';

interface Store {
  loading: boolean;
  messages: Message[];
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  subscribeToNewMessages: () => void;
  unsubscribeFromNewMessages: () => void;
}

const useMessageStore = create<Store>()((set) => ({
  loading: false,
  messages: [],
  sendMessage: async (receiverId: string, content: string) => {
    set({ loading: true });
    try {
      await axiosInstance.post('/messages/send', {
        receiverId,
        content
      });
      toast.success('Message sent');
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
  getMessages: async (userId: string) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get<MessagesResponse>(
        `/messages/conversation/${userId}`
      );
      set({ messages: res.data.messages });
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
      set({ messages: [] });
    } finally {
      set({ loading: false });
    }
  },
  subscribeToNewMessages: () => {
    try {
      const socket = getSocket();

      // newMatch event emitted from server
      socket.on('newMessage', ({ message }) => {
        set((state) => ({
          messages: [...state.messages, message]
        }));
        toast.success('You got a new message!');
      });
    } catch (err) {
      console.log(err);
    }
  },
  unsubscribeFromNewMessages: () => {
    try {
      const socket = getSocket();
      socket.off('newMessage');
    } catch (err) {
      console.log(err);
    }
  }
}));

export default useMessageStore;
