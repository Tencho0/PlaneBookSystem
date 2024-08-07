import React from 'react';
import { BookingForm } from './components/BookingForm';
import { BookingList } from './components/BookingList';
import { createBooking } from './api';

const App = () => {
  const handleBookingSubmit = async (formData) => {
    const result = await createBooking(formData);
    console.log(result);
    console.log(formData);

    return result;
  };

  return (
    <div>
      <h1>Plane Ticket Booking</h1>
      <BookingForm onSubmit={handleBookingSubmit} />
      <BookingList />
    </div>
  );
};

export default App;
