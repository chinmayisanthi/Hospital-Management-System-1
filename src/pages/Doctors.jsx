import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Apply filter when doctors or speciality changes
  const applyFilter = () => {
    if (doctors && doctors.length > 0) {
      if (speciality) {
        setFilterDoc(doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase()));
      } else {
        setFilterDoc(doctors);
      }
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
  ];

  return (
    <div className="p-6">
      <p className="text-2xl font-semibold text-gray-800 mb-4">Browse by Speciality</p>
      <div className="flex flex-wrap gap-4 mb-8">
        {specialities.map((spec, index) => (
          <button
            key={index}
            onClick={() => navigate(`/doctors/${spec.toLowerCase()}`)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
          >
            {spec}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
          >
            {/* Image container with adjusted size and centered image */}
            <div className="h-40 w-full flex items-center justify-center bg-blue-50">
              <img
                className="h-24 w-24 object-cover object-center rounded-full"
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-green-600 font-semibold">Available</p>
              </div>
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
              <button
                onClick={() => navigate('/bookappointment')}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
