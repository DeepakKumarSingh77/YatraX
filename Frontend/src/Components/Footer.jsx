import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="flex justify-around gap-8 max-w-7xl mx-auto px-4">
        {/* About Us Section */}
        <div className='w-[30vw]'>
          <h3 className="text-lg font-semibold mb-4">About YatraX</h3>
          <p className="text-gray-300">
            YatraX is your trusted partner for convenient and reliable ride booking. We connect you with experienced drivers to get you where you need to go, safely and affordably.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-300">
            <li>
              <Link to="/" className="hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/book-ride" className="hover:text-white transition-colors duration-200">
                Book a Ride
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300">
            Email: support@yatrax.com
          </p>
          <p className="text-gray-300">
            Phone: +1 (555) 123-4567
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8">
        <p className="text-gray-400">&copy; 2025 YatraX. All rights reserved.</p>
      </div>
    </footer>
  );
};