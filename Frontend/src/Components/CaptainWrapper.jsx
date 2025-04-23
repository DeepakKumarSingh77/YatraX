import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem('token')) || null;
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          setCaptain(response.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem('token');
        navigate('/captain-login');
        setLoading(false);
      });
  }, [token]); // ✅ This closing bracket was missing

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("hello");

  return (
    <div>
      {children}
    </div>
  );
};

export default CaptainWrapper;
