// ROBUST TEST SUITE

import bookingsTestData from './bookings-test-data';
import customerTestData from './customer-test-data';
import roomsTestData from './rooms-test-data';

describe("Find past and current bookings", () => {
  it("should return an array of bookings based on a given userID", () => {
    const result = findBookings(bookingsTestData, 9);
    expect (result).to.deep.equal([
      {
      id: "5fwrgu4i7k55hl6x4",
      userID: 9,
      date: "2022/01/27",
      roomNumber: 6
    }
  ]);
  });
    
  it("should work with different IDs", () => {
    const result = findBookings(bookingsTestData, 8);
    expect(result).to.deep.equal([  {
      id: "5fwrgu4i7k55hl7o2",
      userID: 8,
      date: "2022/01/29",
      roomNumber: 1
    },  {
      id: "5fwrgu4i7k55hl78x",
      userID: 8,
      date: "2022/02/19",
      roomNumber: 5
    }]);
  });

  it("should return an empty array if no matches", () => {
    const result = returnFilteredTag(bookingsTestData, 50);
    expect(result).to.deep.equal([]);
  });
});


describe("Find the total amount a customer has spent on rooms", () => {
  it("should return a number based on a given array of room IDs", () => {
    const result = findTotalSpent(roomsTestData, [1, 5]);
    expect(result).to.equal(698.57);
  });
    
  it("should work with different arrays", () => {
    const result = findTotalSpent(roomsTestData, [6]);
    expect(result).to.equal(397.02);
  });

  it("should return 0 if no matches are found", () => {
    const result = findTotalSpent(roomsTestData, []);
    expect(result).to.equal(0);
  });
});


