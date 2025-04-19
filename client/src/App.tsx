import { Route, Routes } from 'react-router';
import './App.css';
import AuthPage from './pages/AuthPage';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to-right, #f0f0f0_1px, transparent_1px), linear-gradient(to-bottom, #f0f0f0_1px, transparent_1px)] bg-[size:6rem_4rem]'>
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
