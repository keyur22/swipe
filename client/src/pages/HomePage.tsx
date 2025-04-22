import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserProfiles from '../components/UserProfiles';
import useMatchStore from '../store/useMatchStore';
import useAuthStore from '../store/useAuthStore';

const HomePage = () => {
  const { subscribeToNewMatches, unsubscribeFromNewMatches } = useMatchStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      subscribeToNewMatches();
    }

    // return () => unsubscribeFromNewMatches();
  }, [authUser]);

  return (
    <div
      className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100
		 overflow-hidden
		'
    >
      <Sidebar />
      <div className='flex-grow flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
          <UserProfiles />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
