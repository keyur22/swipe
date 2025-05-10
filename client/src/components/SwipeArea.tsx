import TinderCard from 'react-tinder-card';

import useProfilesStore from '../store/useProfilesStore';

const SwipeArea = () => {
  const { profiles, swipeRight, swipeLeft } = useProfilesStore();

  const handleSwipe = (dir: string, userId: string) => {
    if (dir === 'right') swipeRight(userId);
    else if (dir === 'left') swipeLeft(userId);
  };

  return (
    <div className='relative w-full max-w-80 h-[25rem]'>
      {profiles.map((user) => (
        <TinderCard
          className='absolute shadow-none inset-0'
          key={user._id}
          onSwipe={(dir) => handleSwipe(dir, user._id)}
          swipeRequirementType='position'
          swipeThreshold={100}
          preventSwipe={['up', 'down']}
        >
          <div
            className='card bg-white w-70 h-[25rem] select-none rounded-lg overflow-hidden border
        	 border-gray-200 mx-auto'
          >
            <figure className='px-4 pt-4 h-3/4'>
              <img
                src={user.image || '/avatar.png'}
                alt={user.name}
                className='rounded-lg object-cover h-full pointer-events-none'
              />
            </figure>
            <div className='card-body bg-gradient-to-b from-white to-pink-50 p-4 h-1/4'>
              <h2 className='card-title text-xl text-gray-800'>
                {user.name}, {user.age}
              </h2>
              <p className='text-gray-600 mt-2 max-w-70 truncate'>
                {user.about}
              </p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};
export default SwipeArea;
