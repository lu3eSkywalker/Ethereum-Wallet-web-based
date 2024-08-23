import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (

    <div>

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome to Your Wallet</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/setpassphrase')}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Make New Mnemonics
          </button>
          <button
            onClick={() => navigate('/entermnemonics')}
            className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            Recover Your Wallet Using Mnemonics
          </button>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Home;