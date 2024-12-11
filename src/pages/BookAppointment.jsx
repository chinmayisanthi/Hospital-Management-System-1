import React, { useState } from 'react';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    specialization: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [statusColor, setStatusColor] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitAppointment = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(`Appointment booked successfully! Your ID: ${data.id}`);
        setStatusColor('text-green-600');
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.message || 'Failed to book appointment.');
        setStatusColor('text-red-600');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('An error occurred while booking the appointment.');
      setStatusColor('text-red-600');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Book an Appointment</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAppointment();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="fullname" className="block font-medium mb-1">
              Full Name:
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block font-medium mb-1">
              Appointment Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block font-medium mb-1">
              Appointment Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="specialization" className="block font-medium mb-1">
              Specialization:
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="" disabled>
                Select a specialization
              </option>
              <option value="General Consultation">General Consultation</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </form>

        {statusMessage && (
          <div className={`mt-4 text-center font-medium ${statusColor}`}>{statusMessage}</div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
