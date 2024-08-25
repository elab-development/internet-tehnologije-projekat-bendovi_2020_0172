import React from 'react';

const BandRow = ({ band }) => {
    return (
        <tr>
            <td>{band.id}</td>
            <td>{band.name}</td>
            <td>{band.genre}</td>
            <td>{band.description}</td>
            {/* <td>
                <button className="table-button play-button">Play</button>
                <button className="table-button info-button">Detalji</button>
            </td> */}
        </tr>
    );
};

export default BandRow;
