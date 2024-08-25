import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BandsTable.css';
import BandRow from './BandRow';

const BandsTable = () => {
    const [bands, setBands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/bands')
            .then(response => {
                setBands(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the bands!', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBands = bands.filter(band =>
        band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        band.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        band.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bands-table-container">
            <h2 className="table-title">Lista Bendova</h2>
            <input
                type="text"
                placeholder="Pretraži bendove..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <table className="bands-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Naziv</th>
                        <th>Žanr</th>
                        <th>Opis</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBands.map(band => (
                        <BandRow key={band.id} band={band} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BandsTable;
