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


