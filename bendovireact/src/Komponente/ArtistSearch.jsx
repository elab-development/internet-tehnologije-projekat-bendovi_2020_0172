import React, { useState } from "react";
import './ArtistSearch.css';

const ArtistSearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Drži pojam za pretragu
  const [artistData, setArtistData] = useState([]); // Drži podatke o izvođačima
  const [loading, setLoading] = useState(false); // Indikator učitavanja

  const API_KEY = '703cc839e2e447a2547c75896d8e4950';  

  // Funkcija za pretragu izvođača po imenu
  const fetchArtist = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=${API_KEY}&format=json`
      );
      const data = await response.json();
      if (data.results.artistmatches.artist.length > 0) {
        setArtistData(data.results.artistmatches.artist); // Postavi sve izvođače
      } else {
        setArtistData([]); // Ako nema rezultata
      }
    } catch (error) {
      console.error("Greška prilikom pretrage izvođača:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funkcija za rukovanje pretragom
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchArtist();
    }
  };

  return (
    <div>
      <h1>Search for an Artist or Band</h1>
      {/* Forma za pretragu */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter artist or band name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Indikator učitavanja */}
      {loading && <p>Loading...</p>}

      {/* Prikaz rezultata pretrage */}
      {artistData.length > 0 ? (
        <div>
          {artistData.map((artist) => (
            <div key={artist.mbid || artist.name} style={{ marginBottom: "20px" }}>
              <h2>{artist.name}</h2>
              <img
                src={artist.image.find(img => img.size === "extralarge")["#text"]}
                alt={artist.name}
                style={{ width: "300px", height: "300px" }}
              />
              <p><strong>Listeners:</strong> {artist.listeners}</p>
              <a href={artist.url} target="_blank" rel="noopener noreferrer">
                Visit {artist.name} on Last.fm
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No artist found</p>
      )}
    </div>
  );
};

export default ArtistSearch;
