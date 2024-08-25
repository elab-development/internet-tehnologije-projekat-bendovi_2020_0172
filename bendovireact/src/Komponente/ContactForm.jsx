import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import Textarea from './Textarea';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [showModal, setShowModal] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const lastMessageTime = localStorage.getItem('lastMessageTime');
        if (lastMessageTime) {
            const timeElapsed = Date.now() - new Date(lastMessageTime).getTime();
            if (timeElapsed < 10 * 60 * 1000) { // 10 minutes in milliseconds
                setIsBlocked(true);
                const remainingTime = 10 * 60 * 1000 - timeElapsed;
                setCountdown(Math.floor(remainingTime / 1000)); // Set initial countdown in seconds
                const intervalId = setInterval(() => {
                    setCountdown(prevCountdown => {
                        if (prevCountdown <= 1) {
                            clearInterval(intervalId);
                            setIsBlocked(false);
                            return 0;
                        }
                        return prevCountdown - 1;
                    });
                }, 1000);
            }
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isBlocked) {
            setShowModal(true);
            localStorage.setItem('lastMessageTime', new Date().toISOString());
            localStorage.setItem('messageData', JSON.stringify(formData));
            setFormData({ name: '', email: '', message: '' });
            setIsBlocked(true);
            setCountdown(10 * 60); // Start a new 10-minute countdown
            const intervalId = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown <= 1) {
                        clearInterval(intervalId);
                        setIsBlocked(false);
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="contact-form-container">
            <h2>Kontaktirajte nas</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <TextInput
                    label="Ime:"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={true}
                />
                <EmailInput
                    label="Email:"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                />
                <Textarea
                    label="Poruka:"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required={true}
                />
                <button type="submit" className="submit-button" disabled={isBlocked}>
                    {isBlocked ? `Ne možete poslati poruku narednih ${formatTime(countdown)}` : 'Pošalji'}
                </button>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Zdravo, {JSON.parse(localStorage.getItem('messageData')).name}!</h3>
                        <p>Vaša poruka: "{JSON.parse(localStorage.getItem('messageData')).message}" je sačuvana.</p>
                        <p>Uskoro će vas kontaktirati neko iz tima.</p>
                        <button onClick={handleCloseModal} className="close-button">Zatvori</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
