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


