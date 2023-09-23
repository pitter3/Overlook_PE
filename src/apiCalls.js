import { findBookings } from "./functions";

// FETCH REQUESTS

export const getCustomers = 
fetch('http://localhost:3001/api/v1/customers')
.then((response) => {
  if (!response.ok) {
    throw new Error(`Fetch failure, STATUS CODE: ${response.status}`);
  }
  return response.json()
})
.catch((error) => {
  console.error('Error fetching customers:', error)
  throw error
});


export const getRooms = 
fetch('http://localhost:3001/api/v1/rooms')
.then((response) => {
  if (!response.ok) {
    throw new Error(`Fetch failure, status code: ${response.status}`);
  }
  return response.json()
})
.catch((error) => {
  console.error('Error fetching rooms:', error)
  throw error
});


export const getSingleCustomer = (customerID) => 
  fetch(`http://localhost:3001/api/v1/customers/${customerID}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failure: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Error fetching customer:", error);
    throw error;
  })


export const getBookings = 
fetch('http://localhost:3001/api/v1/bookings')
.then((response) => {
  if (!response.ok) {
    throw new Error(`Fetch failure, status code: ${response.status}`);
  }
  return response.json()
})
.catch((error) => {
  console.error('Error fetching rooms:', error)
  throw error
});


export const postBooking = (user, date, room) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    body: JSON.stringify({
      userID: user.id,
      date: date,
      roomNumber: room.number
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Post failure, status code: ${response.status}`);
    }
    return response.json()
  })
  .catch((error) => {
    console.error("Error sending POST request:", error);
    throw error;
  });
}


export const deleteBooking = (bookingID) => {
  return fetch(`http://localhost:3001/api/v1/bookings/${bookingID}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Delete failure, status code: ${response.status}`);
    }
    return response.json()
  })
  .catch((error) => {
    console.error("Error sending DELETE request:", error);
    throw error;
  });
}


export const getBookingsByID = (customerID) => {
  return fetch(`http://localhost:3001/api/v1/bookings`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failure, status code: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    let bookings = data.bookings;
    let customerBookings = findBookings(customerID, bookings);
    return customerBookings;
  })
  .catch((error) => {
    console.error("Error fetching customer bookings:", error);
    throw error;
  });
}