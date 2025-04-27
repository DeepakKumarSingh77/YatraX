import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

export const Charges = () => {
  const { pickup, destination } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState();
  const [rideId, setRideId] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const userId = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    if (!pickup || !destination) {
      navigate('/'); // Redirect to home if pickup or destination is missing
    }
  }, [pickup, destination, navigate]);

  useEffect(() => {
    const getFare = async () => {
      try {
        const fare = await axios.get(`http://localhost:3000/rides/getfare`, {
          params: { pickup, destination }
        });
        setData(fare.data);
      } catch (error) {
        console.error("Error fetching fare", error);
      }
    };
    getFare();
  }, [pickup, destination]);

  const services = [
    {
      title: "auto",
      price: 30,
      image:
        "https://media.istockphoto.com/id/1414019690/photo/auto-rickshaw-bajaj-tuktuk-3d-rendering-on-white-background.jpg?s=612x612&w=0&k=20&c=qm75sswRZHLLJeGe0G1WZsioNToC1rhiJpBpTXBAVm8=",
    },
    {
      title: "car",
      price: 50,
      image: "https://suritours.in/nimg/taxi-service-in-delhi.jpg",
    },
    {
      title: "moto",
      price: 20,
      image: "https://i.pinimg.com/736x/d3/11/59/d31159d6bd1473e34acc98f9d6fd5ed1.jpg",
    },
  ];

  const handleBookNow = async () => {
    if (selected) {
      try {
        const response = await axios.post("http://localhost:3000/rides/bookride", {
          userId,
          pickup,
          destination,
          vehicleType: selected,
        });
        console.log("Ride booked successfully:", response.data);
        setRideId(response.data.ride._id); // ✅ set rideId in state
      } catch (error) {
        console.error("Error booking ride", error);
      }
    } else {
      alert("Please select a service to book.");
    }
  };

  // 🔁 Navigate to book-ride page once rideId is available
  useEffect(() => {
    if (rideId) {
      navigate(`/book-ride/${rideId}`);
    }
  }, [rideId, navigate]);

  return (
    <div className="relative w-screen min-h-screen p-6 flex flex-col items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            'url("https://png.pngtree.com/thumb_back/fh260/background/20250120/pngtree-minimalist-linear-interlace-background-vector-image_16881401.jpg")',
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full">
        <h1 className="text-4xl font-bold text-green-600 mt-14 mb-8 text-center">
          Select Services
        </h1>

        <p className="text-gray-800 font-medium">
          {`Riding from ${pickup} to ${destination}`}
        </p>

        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => setSelected(service.title)}
            className={`w-[80vw] max-w-7xl cursor-pointer transition-shadow ${
              selected === service.title ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <img
                  className="w-24 h-16 object-contain rounded"
                  src={service.image}
                  alt={service.title}
                />
                <p className="text-lg font-semibold text-gray-700">{service.title}</p>
              </div>

              <div className="text-xl font-bold text-green-600">
                ₹{data?.fare?.[service.title] ?? "Loading..."}
              </div>
            </div>
          </div>
        ))}

        <button
          disabled={!selected}
          className={`mt-8 px-6 py-3 text-white font-bold rounded-xl text-lg transition-all ${
            selected
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleBookNow}
        >
          {selected ? `Book ${selected}` : "Select a service to book"}
        </button>
      </div>
    </div>
  );
};
