import React from 'react';

const EmailInput = ({ label, name, value, onChange, required }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type="email"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default EmailInput;
