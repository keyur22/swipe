import { Frown } from 'lucide-react';

const NoProfiles = () => (
  <div className='flex flex-col items-center justify-center h-full text-center p-8'>
    <Frown className='text-pink-400 mb-6' size={80} />
    <p className='text-xl font-semibold text-gray-700 mb-6'>
      No More Profiles to show!
    </p>
  </div>
);

export default NoProfiles;
