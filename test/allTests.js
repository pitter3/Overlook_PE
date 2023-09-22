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

describe("Find rooms based on the room type", () => {
  it("should return an array based on a given string", () => {
    const result = findRoomByType(roomsTestData, "suite");
    expect(result).to.deep.equal([  {
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    }]);
  });
    
  it("should work with different room typs", () => {
    const result = findRoomByType(roomsTestData, "single room");
    expect(result).to.deep.equal([  {
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
    },  
    {
      number: 4,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 429.44
    },  
    {
      number: 5,
      roomType: "single room",
      bidet: true,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 340.17
    }]);
  });

  it("should return an apology message if no rooms are available", () => {
    const result = findRoomByType(roomsTestData, "super awesome chocolate-coated supeer mansion");
    expect(result).to.equal("We are so sorry, but there are no rooms available on that day. Please adjust your search and try again.");
  });
});


describe("Find rooms that are already booked based on a given date", () => {
  it("should only return available room ID numbers", () => {
    const result = checkDate(bookingsTestData, "2022/01/29");
    expect(result).to.deep.equal([2, 3, 4, 5, 6, 20]);
  });
    
  it("should work with different dates", () => {
    const result = checkDate(bookingsTestData, "2022/02/19");
    expect(result).to.deep.equal([1, 2, 3, 4, 6, 20]);
  });

  it("should return an apology message if no rooms are available", () => {
    const result = checkDate(roomsTestData, "super awesome chocolate-coated supeer mansion");
    expect(result).to.equal("We are so sorry, but there are no rooms available on that day. Please adjust your search and try again.");
  });
});