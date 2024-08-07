import React, { useState } from 'react';
import { BookingForm } from './components/BookingForm';
import { BookingList } from './components/BookingList';
import { createBooking } from './api';

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBookingSubmit = async (formData) => {
    const result = await createBooking(formData);

    if (result) {
      setRefreshTrigger((prev) => prev + 1);
    }

    return result;
  };

  return (
    <div>
      <h1>Plane Ticket Booking</h1>
      <BookingForm onSubmit={handleBookingSubmit} />
      <BookingList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default App;
