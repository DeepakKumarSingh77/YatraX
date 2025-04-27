import React, { useEffect, useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const LookingForDriver = ({ data }) => {
  const [startride, setStartride] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('rideStarted', (data) => {
      setStartride(true); // Set to true when the ride starts
    });
    return () => {
      // Cleanup the socket event listener on component unmount
      socket.off('rideStarted');
    };
  }, [socket]);

  if (!data) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 text-center">Loading...</h3>
      </div>
    );
  }

  const captain = data?.captain?.captain;
  const ride = data?.ride?.ride;

  if (startride) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-yellow-400 via-white to-yellow-200 shadow-lg rounded-xl space-y-6">
        <h3 className="text-3xl font-semibold text-gray-800 text-center">🚗 Happy Journey!</h3>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center text-gray-700">
              <p className="text-xl font-medium">
                {captain?.fullname?.firstname} {captain?.fullname?.lastname}
              </p>
              <p className="text-sm text-gray-500">Your Driver</p>
            </div>
            <div className="flex justify-center items-center bg-gray-200 rounded-full w-12 h-12">
              <span className="text-xl text-gray-700">🚗</span>
            </div>
          </div>
          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Vehicle:</strong> {captain?.vehicle?.vehicleType} - {captain?.vehicle?.color}
            </p>
            <p><strong>Plate Number:</strong> {captain?.vehicle?.plate}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-yellow-400 via-white to-yellow-200 shadow-lg rounded-xl space-y-6">
      {!captain ? (
        <>
          <h3 className="text-3xl font-semibold text-gray-800 text-center">🚗 Looking for a Driver...</h3>
          <p className="text-gray-600 text-center text-lg mt-2">Your ride will be assigned soon. Please wait.</p>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-gray-200 border-t-gray-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-center text-sm mt-4">Please be patient as we find the best driver for you!</p>
        </>
      ) : (
        <>
          <h3 className="text-3xl font-semibold text-gray-800 text-center">🚗 Driver Assigned!</h3>
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center text-gray-700">
                <p className="text-xl font-medium">
                  {captain?.fullname?.firstname} {captain?.fullname?.lastname}
                </p>
                <p className="text-sm text-gray-500">Driver</p>
              </div>
              <div className="flex justify-center items-center bg-gray-200 rounded-full w-12 h-12">
                <span className="text-xl text-gray-700">🚗</span>
              </div>
            </div>
            <div className="text-gray-700 space-y-2">
              <p><strong>Vehicle:</strong> {captain?.vehicle?.vehicleType} - {captain?.vehicle?.color}</p>
              <p><strong>Plate Number:</strong> {captain?.vehicle?.plate}</p>
            </div>
            {ride && (
              <div className="text-center mt-4">
                <p className="text-gray-600"><strong>OTP:</strong> {ride?.otp}</p>
                <p className="text-sm text-gray-500 mt-2">Please share the OTP with the driver to start your journey.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LookingForDriver;
