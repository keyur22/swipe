import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import AuthPage from './pages/AuthPage';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  console.log('.......', authUser, '.......');

  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) return null;

  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to-right, #f0f0f0_1px, transparent_1px), linear-gradient(to-bottom, #f0f0f0_1px, transparent_1px)] bg-[size:6rem_4rem]'>
      <Routes>
        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to='/auth' />}
        />
        <Route
          path='/auth'
          element={!authUser ? <AuthPage /> : <Navigate to='/' />}
        />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
