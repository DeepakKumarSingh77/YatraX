import React from 'react'

const NewRequestforDrive = () => {
  const rideRequests = [
    {
      id: 1,
      passenger: 'Alice Johnson',
      pickup: '500 Park Ave',
      dropoff: '200 Main Street',
      time: '2 mins ago',
      estimatedTime: '15 mins',
      price: '₹180',
    },
    {
      id: 2,
      passenger: 'Bob Smith',
      pickup: '750 Sunset Blvd',
      dropoff: '100 Beach Road',
      time: '5 mins ago',
      estimatedTime: '25 mins',
      price: '₹250',
    }
  ]

  const handleAccept = (id) => {
    console.log('Accepted ride with id:', id)
  }

  const handleReject = (id) => {
    console.log('Rejected ride with id:', id)
  }

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-2xl overflow-y-auto max-h-[400px]">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🛎️ New Ride Requests</h2>
      {rideRequests.length === 0 ? (
        <p className="text-gray-500">No new requests at the moment.</p>
      ) : (
        <div className="space-y-4">
          {rideRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{request.passenger}</span>
                <span className="text-sm text-gray-500">{request.time}</span>
              </div>
              <p className="text-sm"><strong>Pickup:</strong> {request.pickup}</p>
              <p className="text-sm"><strong>Dropoff:</strong> {request.dropoff}</p>
              <p className="text-sm"><strong>Estimated Time:</strong> {request.estimatedTime}</p>
              <p className="text-sm"><strong>Price:</strong> {request.price}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="px-4 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NewRequestforDrive
