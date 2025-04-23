import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext'

const UserWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem('token')) || null;
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/user-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem('token');
        navigate('/user-login');
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

export default UserWrapper;
