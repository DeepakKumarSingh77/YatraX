import React from 'react';

const LookingForDriver = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        🚗 Looking for a Driver...
      </h3>
      <p className="text-gray-600 text-center text-lg">
        Your ride will be assigned soon. Please wait.
      </p>
      <div className="flex justify-center items-center space-x-2">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-gray-200 border-t-gray-500 rounded-full"></div>
      </div>
      <p className="text-gray-600 text-center text-sm mt-4">
        Please be patient as we find the best driver for you!
      </p>
    </div>
  );
};

export default LookingForDriver;
