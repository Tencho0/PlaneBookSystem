import React, { useEffect, useState } from 'react';
import { fetchBookings, deleteBooking } from '../api';

export const BookingList = ({ refreshTrigger }) => {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(0);
    const [totalBookingsCount, setTotalBookingsCount] = useState(0);
    const [error, setError] = useState(null);
    const bookingsPerPage = 5;

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const { list, totalCount } = await fetchBookings(page);
                setBookings(list);
                setTotalBookingsCount(totalCount);
            } catch (err) {
                setError('Could not fetch bookings. Please try again later.');
                console.error(err);
            }
        };
        loadBookings();
    }, [page, refreshTrigger]);

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id);
            setBookings(bookings.filter((booking) => booking.id !== id));
        } catch (err) {
            setError('Could not delete booking. Please try again later.');
            console.error(err);
        }
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const totalPages = Math.ceil(totalBookingsCount / bookingsPerPage);

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.firstName} {booking.lastName} - {booking.departureAirportId} to {booking.arrivalAirportId}
                        <button onClick={() => handleDelete(booking.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index)}
                        disabled={page === index}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};