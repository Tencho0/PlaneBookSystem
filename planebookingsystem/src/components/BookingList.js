import React, { useEffect, useState } from 'react';
import { fetchBookings, deleteBooking } from '../api';

export const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const newBookings = await fetchBookings(page);
                console.log('Fetched bookings:', newBookings);
                setBookings((prev) => [...prev, ...newBookings]);
            } catch (err) {
                setError('Could not fetch bookings. Please try again later.');
                console.error(err);
            }
        };
        loadBookings();
    }, [page]);

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id);
            setBookings(bookings.filter((booking) => booking.id !== id));
        } catch (err) {
            setError('Could not delete booking. Please try again later.');
            console.error(err);
        }
    };

    const handleScroll = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
            setPage(page + 1);
        }
    };

    return (
        <div onScroll={handleScroll}>
            {error && <div className="error">{error}</div>}
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.firstName} {booking.lastName} - {booking.departureAirport} to {booking.destinationAirport}
                        <button onClick={() => handleDelete(booking.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};