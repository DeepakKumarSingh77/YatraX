import React from 'react'

const RecentDriveByUser = () => {
  // Sample data for the drive history
  const recentDrives = [
    {
      driver: 'John Doe',
      pickup: '123 Main St',
      dropoff: '456 Elm St',
      date: '2023-10-01'
    },
    {
      driver: 'Jane Smith',
      pickup: '789 Oak St',
      dropoff: '321 Pine Ave',
      date: '2023-10-02'
    },
    {
      driver: 'Alex Johnson',
      pickup: 'Park Lane',
      dropoff: 'Sunset Blvd',
      date: '2023-10-03'
    }
  ]

  return (
    <div className="w-full space-y-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800 mt-2">👋 Welcome back, User!</h1>

      <div className="w-full p-4 bg-white shadow-lg rounded-2xl overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">🚗 Recent Drive History</h2>
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Pickup</th>
              <th className="px-4 py-2">Dropoff</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentDrives.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-2">{item.driver}</td>
                <td className="px-4 py-2">{item.pickup}</td>
                <td className="px-4 py-2">{item.dropoff}</td>
                <td className="px-4 py-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentDriveByUser
