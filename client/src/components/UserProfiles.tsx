import { useEffect } from 'react';
import useProfilesStore from '../store/useProfilesStore';
import LoadingProfiles from './LoadingProfiles';
import NoProfiles from './NoProfiles';

const UserProfiles = () => {
  const { loading, getProfiles, profiles } = useProfilesStore();

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      {profiles.length > 0 && !loading && (
        <>
          <div>Helllo</div>
          {/* <SwipeArea />
							<SwipeFeedback /> */}
        </>
      )}
      {profiles.length === 0 && !loading && <NoProfiles />}
      {loading && <LoadingProfiles />}
    </>
  );
};

export default UserProfiles;
