import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Pocetna from './Komponente/Pocetna';
import BandsTable from './Komponente/BandsTable';
import AboutUs from './Komponente/AboutUs';
import ContactForm from './Komponente/ContactForm';
import Navbar from './Komponente/Navbar';
import RegistrationForm from './Komponente/RegistrationForm';
import LoginForm from './Komponente/LoginForm';

function App() {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Provera da li već postoji token u sessionStorage prilikom inicijalnog učitavanja
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('auth_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    setAuthToken(token);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    setUser(null);
    setAuthToken(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/bands" element={<BandsTable />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
