import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BandsTable.css';
import BandRow from './BandRow';

const BandsTable = () => {
    const [bands, setBands] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/bands')
            .then(response => {
                setBands(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the bands!', error);
            });
    }, []);

    return (
        <div className="bands-table-container">
            <h2 className="table-title">Lista Bendova</h2>
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
                    {bands.map(band => (
                        <BandRow key={band.id} band={band} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BandsTable;
