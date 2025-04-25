import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import RecentDriveHistory from '../Components/RecentDriveHistory'
import NewRequestforDrive from '../Components/NewRequestforDrive'
import { CaptainDataContext } from '../context/CaptainContext'

const containerStyle = {
  width: '100%',
  height: '300px'
}

const CaptainHome = () => {
  const socket = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [newRequest, setNewRequest] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
          socket.emit('locationUpdate', { lat: latitude, lng: longitude, captainId: captain.captain._id }) // Send location to server
        })
      }
    }

    updateLocation()

    // Listen for new ride requests
    socket.on("ride-request", (data) => {
      setNewRequest(true); // Show visual indicator
      playNotificationSound(); // Play notification sound
      console.log("📦 New ride request received:", data)
    })

    return () => {
      socket.off("ride-request")
    }
  }, [socket])

  const playNotificationSound = () => {
    const audio = new Audio('/path-to-sound/notification.mp3') // Use your own sound file
    audio.play()
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full mt-22'>
      <div className='h-[300px] w-full'>{isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      ) : <p>Loading Map...</p>}</div>
      
      {/* Notification Indicator */}
      {newRequest && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 p-4 bg-yellow-500 text-white rounded-xl shadow-md animate-pulse">
          <span>New Ride Request! 🚗</span>
        </div>
      )}

      <div className='flex w-full h-full'>
        <div className='w-1/2'><RecentDriveHistory /></div>
        <div className='w-1/2'><NewRequestforDrive /></div>
      </div>
    </div>
  )
}

export default CaptainHome
