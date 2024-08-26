import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BandsTable.css';
import BandRow from './BandRow';
import NewBandModal from './NewBandModal';  

const BandsTable = () => {
    const [bands, setBands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [currentBand, setCurrentBand] = useState(null); // State za trenutno uređivani bend

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');

        axios.get('http://127.0.0.1:8000/api/bands', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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

    const handleModalClose = (newBand) => {
        setIsModalOpen(false);
        setCurrentBand(null); // Resetuje trenutno uređivani bend
        if (newBand) {
            setBands(prevBands => {
                const existingIndex = prevBands.findIndex(b => b.id === newBand.id);
                if (existingIndex !== -1) {
                    const updatedBands = [...prevBands];
                    updatedBands[existingIndex] = newBand;
                    return updatedBands;
                } else {
                    return [...prevBands, newBand];
                }
            });
        }
    };

    const handleDelete = (id) => {
        const token = sessionStorage.getItem('authToken');

        axios.delete(`http://127.0.0.1:8000/api/bands/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setBands(prevBands => prevBands.filter(band => band.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the band!', error);
            });
    };

    const handleEdit = (band) => {
        setCurrentBand(band);
        setIsModalOpen(true);
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
            <button onClick={() => setIsModalOpen(true)} className="add-band-button">
                Dodaj Bend
            </button>
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
                        <BandRow key={band.id} band={band} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
                </tbody>
            </table>
            {isModalOpen && <NewBandModal onClose={handleModalClose} band={currentBand} />}
        </div>
    );
}

export default BandsTable;
