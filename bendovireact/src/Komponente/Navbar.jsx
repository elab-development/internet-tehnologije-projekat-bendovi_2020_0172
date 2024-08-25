import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
                        <Link to="/bands" className="nav-links">Bendovi</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links">O Nama</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links">Kontakt</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
