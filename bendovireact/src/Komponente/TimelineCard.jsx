import React from 'react';
 
const TimelineCard = ({ year, text }) => {
    return (
        <div className="timeline-item">
            <div className="timeline-content">
                <h2>{year}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default TimelineCard;
