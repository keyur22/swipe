import Header from '../components/Header';

const HomePage = () => {
  return (
    <div
      className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100
		 overflow-hidden
		'
    >
      <div className='flex-grow flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
          Homepage
        </main>
      </div>
    </div>
  );
};

export default HomePage;
