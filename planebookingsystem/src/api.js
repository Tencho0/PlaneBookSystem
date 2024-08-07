const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const fetchAirports = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/airports?authToken=${API_TOKEN}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const airports = await response.json();
        console.log('Airports:', airports);
        return airports;
    } catch (error) {
        console.error('Error fetching airports:', error);
        return null;
    }
}

export const fetchBookings = async (page) => {
    try {
        // const response = await fetch(`${API_BASE_URL}/bookings?pageIndex=${page}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${API_TOKEN}`,
        //     }
        // });

        const response = await fetch(`${API_BASE_URL}/bookings?pageIndex=${page}&authToken=${API_TOKEN}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }

        const data = await response.json();
        console.log(data);
        console.log(data.list);

        return data.list;
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        throw error;
    }
};

export const createBooking = async (bookingData) => {
    try {
        console.log(JSON.stringify(bookingData));

        const response = await fetch(`${API_BASE_URL}/bookings/create?authToken=${API_TOKEN}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        console.log(response);


        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error creating booking:', errorResponse);
            throw new Error(`HTTP error! Status: ${response.status} - ${JSON.stringify(errorResponse)}`);
        }

        const data = await response.json();
        console.log('Booking created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating booking:', error.message);
        throw error;
    }
};

export const deleteBooking = async (id) => {
    // const response = await fetch(`${API_BASE_URL}/bookings/delete/${id}`, {
    //     method: 'DELETE',
    //     headers: { Authorization: `Bearer ${API_TOKEN}` }
    // });

    const response = await fetch(`${API_BASE_URL}/bookings/delete/${id}?authToken=${API_TOKEN}`, {
        method: 'DELETE',
    });

    console.log(response);
};  