import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";

export const Charges = () => {
  const { pickup, destination } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [data, setdata] = useState();

  useEffect(() => {
    if (!pickup || !destination) {
      navigate('/'); // Redirect to home if pickup or destination is missing
    }
  }, [pickup, destination, navigate]);

  useEffect(() => {
    const getfare = async () => {
      try {
        const fare = await axios.get(`http://localhost:3000/rides/getfare`, {
          params: { pickup, destination }
        });
        setdata(fare.data);
      } catch (error) {
        console.error("Error fetching fare", error);
      }
    };
    getfare();
  }, []);

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

  const handleBookNow = () => {
    if (selected) {
      alert(`Booking ${selected} from ${pickup} to ${destination}`);
      // Here you would typically make an API call to book the ride
    }
  };

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
          <Link to="/book-ride">{selected ? `Book ${selected}` : "Select a service to book"}</Link>
        </button>
      </div>
    </div>
  );
};
