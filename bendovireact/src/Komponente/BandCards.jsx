import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick"; // Uvezi Slider komponentu iz react-slick
import './BandCards.css'; // Dodaj stilove

const UNSPLASH_API_KEY = "823wRXuwrsMgjhtbJcsF_wNO0FwE05gcPCSwrerl_fM";  

const BandCards = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomImages, setRandomImages] = useState({}); // Čuva slike za svaki bend
  const [searchTerm, setSearchTerm] = useState(''); // Pretraga
  const [sortKey, setSortKey] = useState('name'); // Sortiranje prema imenu
  const [sortDirection, setSortDirection] = useState('asc'); // Smer sortiranja
  const [favorites, setFavorites] = useState([]); // Omiljeni bendovi korisnika
  const [showFavorites, setShowFavorites] = useState(false); // Prikaz omiljenih bendova

  const token = sessionStorage.getItem('auth_token'); // Uzimanje tokena iz sesije

  // Funkcija za učitavanje bendova iz API-ja
  const fetchBands = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/bands", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBands(response.data);
    } catch (error) {
      console.error("Error fetching bands:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funkcija za generisanje random slika sa Unsplash API-ja (3 slike po bendu)
  const fetchRandomImages = async (bandId) => {
    try {
      const responses = await Promise.all([
        axios.get(`https://api.unsplash.com/photos/random?query=concert,music&client_id=${UNSPLASH_API_KEY}`),
        axios.get(`https://api.unsplash.com/photos/random?query=concert,music&client_id=${UNSPLASH_API_KEY}`),
        axios.get(`https://api.unsplash.com/photos/random?query=concert,music&client_id=${UNSPLASH_API_KEY}`)
      ]);
      setRandomImages(prevImages => ({
        ...prevImages,
        [bandId]: responses.map(response => response.data.urls.small) // Postavi 3 slike za odgovarajući bend
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Učitavanje omiljenih bendova
  const fetchFavoriteBands = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/favorite-bands", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(response.data.map(fav => fav.band_id));
    } catch (error) {
      console.error("Error fetching favorite bands:", error);
    }
  };

  // Dodavanje benda u omiljene
  const addFavorite = async (bandId) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/favorite-bands", {
        band_id: bandId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites([...favorites, bandId]);
    } catch (error) {
      console.error("Error adding favorite band:", error);
    }
  };

  // Uklanjanje benda iz omiljenih
  const removeFavorite = async (bandId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/favorite-bands/${bandId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(favorites.filter(favId => favId !== bandId));
    } catch (error) {
      console.error("Error removing favorite band:", error);
    }
  };

  // Učitavanje bendova i generisanje slika
  useEffect(() => {
    const loadBandsAndImages = async () => {
      await fetchBands(); // Prvo učitaj bendove
      await fetchFavoriteBands(); // Učitaj omiljene bendove korisnika
    };
    loadBandsAndImages();
  }, []);

  useEffect(() => {
    // Kada bendovi budu učitani, generiši slike za svaki bend
    bands.forEach(band => fetchRandomImages(band.id));
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
    .filter(band => !showFavorites || favorites.includes(band.id)) // Prikaz omiljenih ako je opcija aktivna
    .sort(sortBands);

  if (loading) {
    return <p>Loading bands...</p>;
  }

  // Podešavanja za react-slick slajder
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* Pretraga i sortiranje */}
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

      {/* Prikaz svih ili omiljenih bendova */}
      <div className="filter-container">
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "Show All Bands" : "Show Favorite Bands"}
        </button>
      </div>

      {/* Kartice bendova */}
      <div className="band-cards-container">
        {filteredBands.length > 0 ? (
          filteredBands.map((band) => (
            <div key={band.id} className="band-card">
              {/* Slajder sa 3 slike */}
              <Slider {...sliderSettings}>
                {randomImages[band.id] && randomImages[band.id].map((imgUrl, index) => (
                  <div key={index}>
                    <img 
                      src={imgUrl} 
                      alt={`Random image for ${band.name}`} 
                      className="band-image" 
                    />
                  </div>
                ))}
              </Slider>
              <h2>{band.name}</h2>
              <p><strong>Genre:</strong> {band.genre}</p>
              <p>{band.description}</p>
              <a href={band.youtube_channel} target="_blank" rel="noopener noreferrer">
                Youtube Channel
              </a> | 
              <a href={band.spotify_profile} target="_blank" rel="noopener noreferrer">
                Spotify Profile
              </a>

              {/* Dugme za dodavanje ili uklanjanje iz omiljenih */}
              {favorites.includes(band.id) ? (
                <button 
                  onClick={() => removeFavorite(band.id)} 
                  className="favorite-button remove"
                >
                  Remove from Favorites
                </button>
              ) : (
                <button 
                  onClick={() => addFavorite(band.id)} 
                  className="favorite-button add"
                >
                  Add to Favorites
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No bands available</p>
        )}
      </div>
    </>
  );
};

export default BandCards;
