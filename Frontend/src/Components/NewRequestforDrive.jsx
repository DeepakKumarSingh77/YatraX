import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const NewRequestforDrive = ({ rideRequest }) => {
  const captainId = JSON.parse(localStorage.getItem('captain'));
  const socket = useContext(SocketContext);

  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [otpInput, setOtpInput] = useState(''); // For OTP input
  const [otpError, setOtpError] = useState(''); // For showing OTP error message
  const [journeyStarted, setJourneyStarted] = useState(false); // Track journey start status

  const handleAccept = () => {
    if (rideRequest?.name?.ride?._id) {
      socket.emit('acceptRide', { rideId: rideRequest.name.ride._id, captainId });
      setAccepted(true);
    }
  };

  const handleReject = () => {
    if (rideRequest?.name?.ride?._id) {
      console.log('Rejected ride with id:', rideRequest.name.ride._id);
      setRejected(true);
    }
  };

  const handleOtpSubmit = () => {
    if (otpInput === rideRequest?.name?.ride?.otp) {
      setJourneyStarted(true);
      setOtpError(''); // Clear any previous error
      socket.emit('startJourney', { rideId: rideRequest.name.ride._id, captainId });
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  if (!rideRequest?.name?.ride || accepted || rejected || journeyStarted) {
    return (
      <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">🛎️ New Ride Requests</h2>
        <p className="text-gray-500">{accepted ? 'Ride request accepted!' : journeyStarted ? 'Journey started!' : 'No new requests at the moment.'}</p>
        {journeyStarted && (
          <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-green-500">Happy Journey! 🚗</h3>
          </div>
        )}
        {/* Hide OTP input section if no request or journey started */}
        {!journeyStarted && rideRequest?.name?.ride?.otp && (
          <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleOtpSubmit}
              className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Submit OTP
            </button>
            {otpError && <p className="text-red-500 mt-2">{otpError}</p>}
          </div>
        )}
      </div>
    );
  }

  const data = rideRequest.name.ride;

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🛎️ New Ride Request</h2>
      <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm flex flex-col gap-2">
        <p className="text-sm"><strong>Pickup:</strong> {data.pickup}</p>
        <p className="text-sm"><strong>Dropoff:</strong> {data.destination}</p>
        <p className="text-sm"><strong>Fare:</strong> ₹{data.fare}</p>
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleAccept}
            className="px-4 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRequestforDrive;
