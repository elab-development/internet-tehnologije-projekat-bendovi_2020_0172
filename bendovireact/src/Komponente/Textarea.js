import React from 'react';

const Textarea = ({ label, name, value, onChange, required }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default Textarea;
