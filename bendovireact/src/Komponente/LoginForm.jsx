import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';  // Reuse the same CSS for consistency
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: 'johndoe@example.com',
    password: 'password',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let navigate= useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      
      // Čuvanje tokena i korisničkih podataka u sessionStorage
      sessionStorage.setItem('auth_token', response.data.access_token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      // Postavljanje podataka u App state
      onLogin(response.data.user, response.data.access_token);

      setSuccess('Login successful!');
      setError(null);
      if(response.data.user.role=="admin"){
        navigate('/bands');
      }else{
        navigate('/bandscards');

      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setSuccess(null);
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="register-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
