import React, { useState,useContext,useEffect } from 'react';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const CaptainLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate=useNavigate();
  const socket=useContext(SocketContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
 const captainid=localStorage.getItem('captain');

  useEffect(() => {
        if (socket) {
          socket.emit('updateSocketId', {usertype: 'captain',id: captainid});
        }
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.status===200){
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('captain', JSON.stringify(response.data.captain._id));
        socket.emit('updateSocketId',{usertype:'captain',id:response.data.captain._id});
        navigate('/captain-home');
      }else{
        window.alert("Invalid Credentials")
      }
    } catch (error) {
      console.error('Login failed:', error);
      window.alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Captain Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;