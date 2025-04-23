import React from 'react';

const Services = () => {
  const servicesData = [
    {
      title: 'Bike',
      description: 'Get a ride in minutes',
      image: 'https://i.pinimg.com/736x/d3/11/59/d31159d6bd1473e34acc98f9d6fd5ed1.jpg',
    },
    {
      title: 'Auto',
      description: 'Get a delivery in minutes',
      image: 'https://media.istockphoto.com/id/1414019690/photo/auto-rickshaw-bajaj-tuktuk-3d-rendering-on-white-background.jpg?s=612x612&w=0&k=20&c=qm75sswRZHLLJeGe0G1WZsioNToC1rhiJpBpTXBAVm8=',
    },
    {
      title: 'Cab',
      description: 'Get a cab in minutes',
      image: 'https://suritours.in/nimg/taxi-service-in-delhi.jpg',
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-82 object-cover" src={service.image} alt={service.title} />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;