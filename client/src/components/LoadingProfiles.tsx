const LoadingProfiles = () => {
  return (
    <div className='relative w-full max-w-80 h-[25rem]'>
      <div className='card bg-white xs:w-60 md:w-80 h-[25rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
        <div className='px-4 pt-4 h-3/4'>
          <div className='w-full h-full bg-gray-200 rounded-lg' />
        </div>
        <div className='card-body bg-gradient-to-b from-white to-pink-50 p-4 h-1/4'>
          <div className='space-y-2'>
            <div className='h-6 bg-gray-200 rounded w-3/4' />
            <div className='h-4 bg-gray-200 rounded w-1/2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProfiles;
