import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewBandModal.css';

const NewBandModal = ({ onClose, band }) => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (band) {
            setName(band.name);
            setGenre(band.genre);
            setDescription(band.description);
        }
    }, [band]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedBand = {
            name,
            genre,
            description
        };

        const token = sessionStorage.getItem('authToken');

        if (band) {
            // Ažuriranje postojećeg benda
            axios.put(`http://127.0.0.1:8000/api/bands/${band.id}`, updatedBand, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    onClose(response.data); // Vraćanje ažuriranog benda glavnoj komponenti
                })
                .catch(error => {
                    console.error('There was an error updating the band!', error);
                });
        } else {
            // Kreiranje novog benda
            axios.post('http://127.0.0.1:8000/api/bands', updatedBand, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    onClose(response.data); // Vraćanje novog benda glavnoj komponenti
                })
                .catch(error => {
                    console.error('There was an error creating the band!', error);
                });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{band ? 'Ažuriraj Bend' : 'Kreiraj Novi Bend'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Naziv:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Žanr:
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Opis:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="submit-button">
                        {band ? 'Ažuriraj Bend' : 'Dodaj Bend'}
                    </button>
                    <button type="button" className="cancel-button" onClick={() => onClose(null)}>Otkaži</button>
                </form>
            </div>
        </div>
    );
}

export default NewBandModal;
