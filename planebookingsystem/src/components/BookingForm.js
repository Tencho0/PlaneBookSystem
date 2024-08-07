import React, { useState, useEffect } from 'react';
import { fetchAirports } from '../api';

export const BookingForm = ({ onSubmit }) => {
    const initialFormState = {
        firstName: '',
        lastName: '',
        departureAirportId: '',
        arrivalAirportId: '',
        departureDate: '',
        returnDate: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        async function loadAirports() {
            const airportData = await fetchAirports();
            if (airportData) {
                setAirports(airportData);
            }
        }

        loadAirports();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.departureAirportId || !formData.arrivalAirportId) {
            alert("All fields are required.");
            return;
        }

        const result = await onSubmit(formData);

        if (result) {
            setFormData(initialFormState);
            alert("Booking successfully created!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />

            <select name="departureAirportId" value={formData.departureAirportId} onChange={handleChange} required>
                <option value="">Select Departure Airport</option>
                {airports.map(airport => (
                    <option key={airport.id} value={airport.id}>
                        {airport.title}
                    </option>
                ))}
            </select>

            <select name="arrivalAirportId" value={formData.arrivalAirportId} onChange={handleChange} required>
                <option value="">Select Destination Airport</option>
                {airports.map(airport => (
                    <option key={airport.id} value={airport.id}>
                        {airport.title}
                    </option>
                ))}
            </select>

            <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
            <button type="submit">Book Ticket</button>
        </form>
    );
};
