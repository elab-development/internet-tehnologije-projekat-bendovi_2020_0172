import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ user, handleLogout }) => {
  let navigate= useNavigate();
  const handleLogoutClick = async () => {
    const token = sessionStorage.getItem('auth_token');

    if (token) {
      try {
        // Slanje POST zahteva za odjavu sa tokenom
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`  // Dodavanje tokena u Authorization header
          }
        });

        navigate('/')
      } catch (err) {
        console.error("Logout failed", err);
      }
    }

    // Brisanje korisničkih podataka nakon slanja zahteva
    handleLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Muzička Aplikacija
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Početna</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">O Nama</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">Kontakt</Link>
          </li>

          {/* Proveravamo da li je korisnik ulogovan */}
          {user ? (
            <>
              {/* Običan ulogovan korisnik */}
              {user.role === 'user' && (
                <>
                  <li className="nav-item">
                    <Link to="/bandscards" className="nav-links">Bendovi (Korisnici)</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/artists" className="nav-links">Pretraga Izvođača</Link>
                  </li>
                </>
              )}

              {/* Admin korisnik */}
              {user.role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link to="/bands" className="nav-links">Tabela Bendova (Admin)</Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <span className="nav-links">Dobrodošli, {user.name}</span>
              </li>
              <li className="nav-item">
                <button className="nav-links" onClick={handleLogoutClick}>Logout</button>
              </li>
            </>
          ) : (
            <>
              {/* Opcije za neulogovane korisnike */}
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
