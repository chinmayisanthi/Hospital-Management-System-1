import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/appointments/getall')
      .then((res) => {
        setAppointments(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="text-lg font-semibold text-blue-600 mb-2">{appointment.fullname}</div>
            <div className="text-gray-700 mb-2">
              <span className="font-medium">Email:</span> {appointment.email}
            </div>
            <div className="text-gray-700 mb-2">
              <span className="font-medium">Phone:</span> {appointment.phone}
            </div>
            <div className="text-gray-700 mb-2">
              <span className="font-medium">Date:</span>{' '}
              {new Date(appointment.date).toLocaleDateString()}
            </div>
            <div className="text-gray-700 mb-2">
              <span className="font-medium">Time:</span>{' '}
              {new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Specialization:</span> {appointment.specialization}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
