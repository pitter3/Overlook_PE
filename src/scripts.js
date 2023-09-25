import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './images/Logo.png'
import './images/Room1.png'
import {orderBy} from 'lodash'
import {
    getCustomers,
    getRooms,
    getSingleCustomer,
    getBookings,
    postBooking,
    deleteBooking,
    getBookingsByID,
} from './apiCalls.js';
import {getCustomerID, findTotalSpent, findBookings} from './functions';


let activeCustomer = {};

let customers = null;
let rooms = null;
let bookings = null;

Promise.all([getCustomers, getRooms, getBookings])
    .then(([customersData, roomsData, bookingsData]) => {
        customers = customersData.customers;
        rooms = roomsData.rooms;
        bookings = mergeBookingsWithRooms(bookingsData.bookings, roomsData.rooms)
    });


const mergeBookingsWithRooms = (bookings = [], rooms = []) => bookings.map((booking) => ({
    ...booking,
    dateObject: new Date(booking.date),
    room: rooms.find((room) => room.number === booking.roomNumber)
    }))

const splitBookingsByPastAndUpcoming = (bookings = []) => {
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setMilliseconds(0)

    const pastBookings = bookings.filter((booking) => booking.dateObject < today)
    const upcomingBookings = bookings.filter((booking) => booking.dateObject > today)

    return {
        pastBookings: orderBy(pastBookings, ['dateObject'], ['desc']),
        upcomingBookings: orderBy(upcomingBookings, ['dateObject'], ['desc']),
    }
}

// QUERY SELECTORS

const loginForm = document.querySelector(".login-form");
const usernameField = document.querySelector(".username-input");
const passwordField = document.querySelector(".password-input");
// const loginContainer = document.querySelector(".login-container");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (checkUsername(usernameField.value) && checkPassword(passwordField.value)) {
        console.log("LOGIN SUCCESS!!!")
        // loginContainer.remove()
        const customerID = getCustomerID(usernameField.value);
        const customerBookings = findBookings(customerID, bookings)
        activeCustomer.name = getCustomerName(customerID);
        activeCustomer.id = customerID
        activeCustomer.bookings = customerBookings
        activeCustomer.totalSpent = findTotalSpent(rooms, activeCustomer.bookings)
        activeCustomer.pastAndUpcomingBookings = splitBookingsByPastAndUpcoming(activeCustomer.bookings)
        console.log(activeCustomer);
        console.log(bookings)
        console.log(rooms)
        // renderUserPage()
        // populate the main page based on the user who logged in
        // display total spent on rooms
        // display current (and past) bookings
    } else {
        console.log("LOGIN FAILURE :(")
    }
    clearLoginFields();
});

// DOM FUNCTIONS

function clearLoginFields() {
    usernameField.value = "";
    passwordField.value = "";
};

const checkUsername = (username) => {
    const match = username.match(/^customer([1-9]|[1-4][0-9]|50)$/);
    if (match) {
        return true;
    }
    console.log("INVALID USERNAME");
    return false;
};

const checkPassword = (password) => {
    if (password === "overlook2021") {
        return true
    } else {
        console.log("WRONG PASSWORD")
        return false
    }
};

function getCustomerName(id) {
    const customer = customers.find((customer) => {
        return customer.id === id;
    });
    return customer.name;
}

// function getRoomNumbers(customerBookings) {
//   const roomNumbers = customerBookings.map((booking) => booking.roomNumber);
//   return roomNumbers;
// }bo