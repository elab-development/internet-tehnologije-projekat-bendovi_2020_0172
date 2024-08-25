import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BandsTable.css';
import BandRow from './BandRow';

const BandsTable = () => {
    const [bands, setBands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

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

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedBands = [...bands].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredBands = sortedBands.filter(band =>
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
                        <th onClick={() => handleSort('id')}>
                            ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('name')}>
                            Naziv {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('genre')}>
                            Žanr {sortConfig.key === 'genre' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('description')}>
                            Opis {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
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
