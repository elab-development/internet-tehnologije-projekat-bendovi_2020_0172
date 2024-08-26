import React from 'react';


const BandRow = ({ band, onDelete }) => {
    return (
        <tr>
            <td>{band.id}</td>
            <td>{band.name}</td>
            <td>{band.genre}</td>
            <td>{band.description}</td>
            <td>
                <button className="delete-button" onClick={() => onDelete(band.id)}>
                    Obriši
                </button>
            </td>
        </tr>
    );
};

export default BandRow;
