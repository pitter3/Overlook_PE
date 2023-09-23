// TESTABLE FUNCTIONS

export const findBookings = (bookings, id) => {
  const matches = bookings.filter((booking) => {
    return booking.userID === id
  })
  return matches
}

export const findTotalSpent = (rooms, bookedRoomNumbers) => {
  const total = rooms.reduce((acc, room) => {
    bookedRoomNumbers.forEach((bookedRoomNumber) => {
      if (bookedRoomNumber === room.number) {
        acc += room.costPerNight
      }
    })
    return acc
  }, 0)
  const roundedTotal = Math.round(total * 100) / 100;
  return roundedTotal
}

export const findRoomByType = (rooms, roomType) => {
  const matches = rooms.filter((room) => {
    return room.roomType === roomType
  })
  if (matches.length === 0) {
    return "We are so sorry, but there are no rooms available on that day. Please adjust your search and try again."
  }
  return matches
}

export const checkDate = (bookings, date) => {
  const nonMatchingRoomNumbers = bookings
    .filter((booking) => booking.date !== date)
    .map((booking) => booking.roomNumber);

  if (nonMatchingRoomNumbers.length === bookings.length) {
    return "We are so sorry, but there are no rooms available on that day. Please adjust your search and try again.";
  }

  return nonMatchingRoomNumbers;
};

export function login() {
  
}