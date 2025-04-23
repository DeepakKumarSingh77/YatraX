import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Footer } from "../Components/Footer";
import Services from "../Components/Services";

export const Home = () => {
  const [data, setdata] = useState({
    pickup: "",
    destination: "",
  });

  const [autosuggest, setautosuggest] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const pickupelement = useRef(null);
  const destelement = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setIsButtonActive(data.pickup && data.destination);
  }, [data.pickup, data.destination]);

  useEffect(() => {
    const fetchSuggestions = async (field, value) => {
      const response = await axios.get(
        `http://localhost:3000/map/autosuggest?pickup=${value}`
      );
      const suggestions = response.data.predictions.map(
        (item) => item.description
      );
      setautosuggest(suggestions);
    };

    if (data.pickup && activeField === "pickup")
      fetchSuggestions("pickup", data.pickup);
    if (data.destination && activeField === "destination")
      fetchSuggestions("destination", data.destination);
  }, [data.pickup, data.destination, activeField]);

  const autocomplete = (item) => {
    if (activeField === "pickup") {
      setdata((prev) => ({ ...prev, pickup: item }));
      pickupelement.current?.focus();
    } else {
      setdata((prev) => ({ ...prev, destination: item }));
      destelement.current?.focus();
    }
    setautosuggest([]);
  };

  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row min-h-screen">
        {/* Left image section */}
        <div className="lg:w-1/2 w-full h-64 lg:h-screen">
          <img
            className="w-full h-full object-cover"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_690,w_552/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png"
            alt="Taxi background"
          />
        </div>

        {/* Right form section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-orange-100 to-white p-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 mb-6 text-center">
            Book Your Ride with <span className="text-orange-600">YATRAX</span>
          </h1>

          <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 space-y-5">
            <input
              name="pickup"
              value={data.pickup}
              onChange={handleInputChange}
              onFocus={() => setActiveField("pickup")}
              ref={pickupelement}
              placeholder="Enter Pickup Location"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="destination"
              value={data.destination}
              onChange={handleInputChange}
              onFocus={() => setActiveField("destination")}
              ref={destelement}
              placeholder="Enter Destination"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {isButtonActive ? (
              <Link
                to={`/getfare/${encodeURIComponent(
                  data.pickup
                )}/&/${encodeURIComponent(data.destination)}`}
              >
                <button className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition duration-300 font-semibold">
                  Book Ride
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-white py-3 rounded-xl cursor-not-allowed"
              >
                Book Ride
              </button>
            )}
          </div>

          {/* Suggestions */}
          {autosuggest.length > 0 && (
            <div className="w-full max-w-lg mt-4 space-y-2">
              {autosuggest.slice(0, 3).map((item, i) => (
                <div
                  key={i}
                  onClick={() => autocomplete(item)}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-orange-50 transition"
                >
                  <FaMapMarkerAlt className="text-orange-500" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Services/>
      <Footer />
    </div>
  );
};
