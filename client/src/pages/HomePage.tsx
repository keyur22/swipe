import useAuthStore from '../store/useAuthStore';

const HomePage = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <p>HomePage</p>
      <button
        className='mt-2 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus: ring-2 focus:ring-offset-2 focus:ring-pink-500'
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
