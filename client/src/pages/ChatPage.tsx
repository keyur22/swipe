import { useParams } from 'react-router';
import Header from '../components/Header';
import useAuthStore from '../store/useAuthStore';
import useMatchStore from '../store/useMatchStore';
import useMessageStore from '../store/useMessageStore';

const ChatPage = () => {
  return (
    <div className='flex flex-col h-screen bg-gray-100 bg-opacity-50'>
      <Header />

      <div className='flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full'>
        <div className='flex items-center mb-4 bg-white rounded-lg shadow p-3'>
          <img
            src={'/avatar.png'}
            className='w-12 h-12 object-cover rounded-full mr-3 border-2 border-pink-300'
          />
          <h2 className='text-xl font-semibold text-gray-800'>John Cena</h2>
        </div>

        <div className='flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4'>
          {1 === 2 ? (
            <p className='text-center text-gray-500 py-8'>
              Start your conversation with John Cena
            </p>
          ) : (
            [1, 2, 3, 4, 5].map((msg) => (
              <div
                // key={msg._id}
                className={`mb-3 text-right`}
              >
                <span
                  className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md `}
                >
                  Hello World
                </span>
              </div>
            ))
          )}
        </div>
        {/* <MessageInput match={match} /> */}
      </div>
    </div>
  );
};

export default ChatPage;
