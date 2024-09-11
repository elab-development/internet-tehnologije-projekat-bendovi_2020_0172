import React, { useState, useEffect } from "react";
import axios from "axios";
import './BandCards.css'; // Dodaj stilove

const UNSPLASH_API_KEY = "823wRXuwrsMgjhtbJcsF_wNO0FwE05gcPCSwrerl_fM";  

const BandCards = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomImages, setRandomImages] = useState({}); // Čuva slike za svaki bend
  const [searchTerm, setSearchTerm] = useState(''); // Pretraga
  const [sortKey, setSortKey] = useState('name'); // Sortiranje prema imenu
  const [sortDirection, setSortDirection] = useState('asc'); // Smer sortiranja

  // Funkcija za učitavanje bendova iz API-ja
  const fetchBands = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/bands");  
      setBands(response.data);
    } catch (error) {
      console.error("Error fetching bands:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funkcija za generisanje random slika sa Unsplash API-ja
  const fetchRandomImage = async (bandId) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?query=concert,music&client_id=${UNSPLASH_API_KEY}`);
      setRandomImages(prevImages => ({
        ...prevImages,
        [bandId]: response.data.urls.small, // Dodeli sliku za odgovarajući bend
      }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // Učitavanje bendova i generisanje slika
  useEffect(() => {
    const loadBandsAndImages = async () => {
      await fetchBands(); // Prvo učitaj bendove
    };
    loadBandsAndImages();
  }, []);

  useEffect(() => {
    // Kada bendovi budu učitani, generiši slike za svaki bend
    bands.forEach(band => fetchRandomImage(band.id));
  }, [bands]);

  // Funkcija za sortiranje
  const sortBands = (a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  };

  // Filtriranje bendova prema pretrazi
  const filteredBands = bands
    .filter(band => 
      band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      band.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      band.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(sortBands);

  if (loading) {
    return <p>Loading bands...</p>;
  }

  return (
    <>
     {/* Pretraga */}
     <div className="search-sort-container">
        <input 
          type="text" 
          placeholder="Search bands..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
        <div className="sort-container">
          <label>Sort by:</label>
          <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
            <option value="name">Name</option>
            <option value="genre">Genre</option>
          </select>
          <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

    <div className="band-cards-container">
     

      {/* Kartice bendova */}
      {filteredBands.length > 0 ? (
        filteredBands.map((band) => (
          <div key={band.id} className="band-card">
            <img 
              src={randomImages[band.id] || 'https://via.placeholder.com/300'} 
              alt={`${band.name} random`} 
              className="band-image" 
            />
            <h2>{band.name}</h2>
            <p><strong>Genre:</strong> {band.genre}</p>
            <p>{band.description}</p>
            <a href={band.youtube_channel} target="_blank" rel="noopener noreferrer">
              Youtube Channel
            </a> | 
            <a href={band.spotify_profile} target="_blank" rel="noopener noreferrer">
              Spotify Profile
            </a>
          </div>
        ))
      ) : (
        <p>No bands available</p>
      )}
    </div>    </>
  );
};

export default BandCards;
