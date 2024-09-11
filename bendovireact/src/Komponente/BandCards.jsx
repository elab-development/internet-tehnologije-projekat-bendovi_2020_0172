import React, { useState, useEffect } from "react";
import axios from "axios";
import './BandCards.css'; // Dodaj stilove

const UNSPLASH_API_KEY = "823wRXuwrsMgjhtbJcsF_wNO0FwE05gcPCSwrerl_fM";  

const BandCards = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomImages, setRandomImages] = useState({}); // Čuva slike za svaki bend

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

  if (loading) {
    return <p>Loading bands...</p>;
  }

  return (
    <div className="band-cards-container">
      {bands.length > 0 ? (
        bands.map((band) => (
          <div key={band.id} className="band-card">
            <img 
              src={randomImages[band.id] || 'placeholder-image-url'} 
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
    </div>
  );
};

export default BandCards;
