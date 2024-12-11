import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthForm = ({ isSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      // Signup logic
      try {
        const response = await fetch('http://localhost:8081/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('Signup successful');
          navigate('/login'); // Redirect to login after successful signup
        } else {
          setError('Signup failed. Please try again.');
        }
      } catch (err) {
        setError('An error occurred during signup.');
      }
    } else {
      // Login logic
      try {
        if (formData.email === 'test@example.com' && formData.password === 'password') {
          localStorage.setItem('token', 'your-auth-token');
          navigate('/'); // Redirect to home page
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } catch (err) {
        setError('An error occurred during login.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="form-container bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label className="block text-left font-bold mt-4">Full Name:</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border rounded mt-2"
              />
              <label className="block text-left font-bold mt-4">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                required
                className="w-full px-4 py-2 border rounded mt-2"
              />
            </>
          )}
          <label className="block text-left font-bold mt-4">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded mt-2"
          />
          <label className="block text-left font-bold mt-4">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded mt-2"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-6 hover:bg-blue-600 transition-all"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <div className="text-center mt-4">
          {isSignup ? (
            <>
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
