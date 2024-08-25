import React from 'react';
import { FaPlay, FaInfoCircle, FaHeart } from 'react-icons/fa';
import './Pocetna.css';

const Pocetna = () => {

    const handlePlayClick = (bandName) => {
        alert(`Playing music from ${bandName}`);
        
    };

    const handleInfoClick = (bandName) => {
        alert(`More info about ${bandName}`);
         
    };

    return (
        <div className="pocetna-container">
            <header className="header">
                <h1>Dobrodošli u aplikaciju za muzičke bendove</h1>
                <p>Otkrijte, slušajte i ocenjujte svoje omiljene bendove</p>
            </header>
            <section className="featured-bands">
                <h2>Istaknuti bendovi</h2>
                <div className="bands-list">
                    <div className="band-item">
                        <img src="band1.jpg" alt="Bend 1" />
                        <h3>Bend 1 <FaHeart className="heart-icon" /></h3>
                        <p>Kratak opis benda 1...</p>
                        <div className="band-actions">
                            <button 
                                className="play-button" 
                                onClick={() => handlePlayClick('Bend 1')}
                            >
                                <FaPlay /> Play
                            </button>
                            <button 
                                className="info-button" 
                                onClick={() => handleInfoClick('Bend 1')}
                            >
                                <FaInfoCircle /> Detalji
                            </button>
                        </div>
                    </div>
                    <div className="band-item">
                        <img src="band2.jpg" alt="Bend 2" />
                        <h3>Bend 2 <FaHeart className="heart-icon" /></h3>
                        <p>Kratak opis benda 2...</p>
                        <div className="band-actions">
                            <button 
                                className="play-button" 
                                onClick={() => handlePlayClick('Bend 2')}
                            >
                                <FaPlay /> Play
                            </button>
                            <button 
                                className="info-button" 
                                onClick={() => handleInfoClick('Bend 2')}
                            >
                                <FaInfoCircle /> Detalji
                            </button>
                        </div>
                    </div>
                    <div className="band-item">
                        <img src="band3.jpg" alt="Bend 3" />
                        <h3>Bend 3 <FaHeart className="heart-icon" /></h3>
                        <p>Kratak opis benda 3...</p>
                        <div className="band-actions">
                            <button 
                                className="play-button" 
                                onClick={() => handlePlayClick('Bend 3')}
                            >
                                <FaPlay /> Play
                            </button>
                            <button 
                                className="info-button" 
                                onClick={() => handleInfoClick('Bend 3')}
                            >
                                <FaInfoCircle /> Detalji
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="explore-music">
                <h2>Istražite muziku</h2>
                <p>Pronađite nove bendove i pesme koje volite!</p>
                <button className="explore-button">Saznajte više</button>
            </section>
            <footer className="footer">
                <p>&copy; 2024 Muzička aplikacija. Sva prava zadržana.</p>
            </footer>
        </div>
    );
}

export default Pocetna;
