import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="contact-form-container">
            <h2>Kontaktirajte nas</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <label htmlFor="name">Ime:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="message">Poruka:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-button">Pošalji</button>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Zdravo, {formData.name}!</h3>
                        <p>Vaša poruka: "{formData.message}" je sačuvana.</p>
                        <p>Uskoro će vas kontaktirati neko iz tima.</p>
                        <button onClick={handleCloseModal} className="close-button">Zatvori</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
