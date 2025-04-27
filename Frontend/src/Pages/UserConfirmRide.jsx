import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import RecentDriveByUser from '../Components/RecentDriveByUser';
import LookingForDriver from '../Components/LookingForDriver';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import captainlogo from '../../public/captainlogo.png';


const containerStyle = {
  width: '100%',
  height: '300px',
};

const UserConfirmRide = () => {
  const socket = useContext(SocketContext);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [drivers, setDrivers] = useState([]); // Track all drivers within radius
  const [sentRequest, setSentRequest] = useState(false);
  const [ridedata, setRideData] = useState({});
  const [data,setdata]=useState({});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // const { user } = useContext(UserDataContext);

  // console.log(user);
  const { id: rideId } = useParams();
console.log(rideId);

useEffect(() => {
  const fetchRide = async () => {
    try {
      const ride = await axios.get(`http://localhost:3000/rides/${rideId}`);
      setRideData(ride.data);
    } catch (error) {
      console.error('Failed to fetch ride data:', error);
    }
  };

  fetchRide();
}, [rideId]);
  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          // Emit location to the server (e.g., for driver location tracking)
          socket.emit('locationUpdate', { lat: latitude, lng: longitude });
          socket.emit('findDrivers', { lat: latitude, lng: longitude });
        });
      }
    };

    updateLocation();

    // Listen for drivers in the 2km radius via WebSocket
    socket.on('driversInRadius', (driversInRadius) => {
      setDrivers(driversInRadius);
    });

    return () => {
      socket.off('driversInRadius'); // Clean up on component unmount
    };
  }, [socket]);


  useEffect(() => {
    if (drivers.length > 0 && !sentRequest) {
      console.log(drivers[0].socketId);
      drivers.forEach(driver => {
        socket.emit('confirm-ride', {
          driverSocketId: driver.socketId,
          userInfo: { lat: location.lat, lng: location.lng, name: ridedata}
        });
      });
      setSentRequest(true);
    }
  }, [drivers, sentRequest]);

  const userid=JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (socket) {
      socket.emit('updateSocketId', {usertype: 'user',id: userid});
    }
  }, [socket]);

  useEffect(() => {
    const handleRideAccepted = async (data) => {
      console.log(data);
      const rideId=data.rideid;
      const captainId=data.capId;
      const captain=await axios.get(`http://localhost:3000/captains/${captainId}`);
      const ride=await axios.get(`http://localhost:3000/rides/${rideId}`);
      setdata({captain: captain.data,ride:ride.data});
    };
  
    socket.on('rideAccepted', handleRideAccepted);
  
    return () => {
      socket.off('rideAccepted', handleRideAccepted); // cleanup
    };
  }, [socket]);
  console.log(data);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full mt-22">
      <div className="h-[300px] w-full">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={15}
          >
            {/* User's current location marker */}
            <Marker position={location} icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue marker for user
              scaledSize: new window.google.maps.Size(30, 30),
            }} />

            {/* Drivers' locations within the 2km radius */}
            {drivers.map((driver, index) => (
              <Marker
                key={index}
                position={{ lat: driver.location.ltd, lng: driver.location.lng }}
                icon={{
                  url:captainlogo, // Red marker for driver
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <p>Loading Map...</p>
        )}
      </div>

      <div className="flex w-full h-full">
        <div className="w-1/2"><RecentDriveByUser /></div>
        <div className="w-1/2"><LookingForDriver data={data}/></div>
      </div>
    </div>
  );
};

export default UserConfirmRide;
