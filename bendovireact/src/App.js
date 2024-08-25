import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Pocetna from './Komponente/Pocetna';
import BandsTable from './Komponente/BandsTable';
import AboutUs from './Komponente/AboutUs';
import ContactForm from './Komponente/ContactForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/bands" element={<BandsTable />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
