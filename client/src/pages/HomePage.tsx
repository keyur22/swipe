import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../store/useAuthStore';

const HomePage = () => {
  const { logout } = useAuthStore();

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
          Homepage
          {/* {userProfiles.length > 0 && !isLoadingUserProfiles && (
						<>
							<SwipeArea />
							<SwipeFeedback />
						</>
					)}

					{userProfiles.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}

					{isLoadingUserProfiles && <LoadingUI />} */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
