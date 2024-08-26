import React from 'react';
 

const BandRow = ({ band, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{band.id}</td>
            <td>{band.name}</td>
            <td>{band.genre}</td>
            <td>{band.description}</td>
            <td>
                <button className="edit-button" onClick={() => onEdit(band)}>
                    Uredi
                </button>
                <button className="delete-button" onClick={() => onDelete(band.id)}>
                    Obriši
                </button>
            </td>
        </tr>
    );
};

export default BandRow;
