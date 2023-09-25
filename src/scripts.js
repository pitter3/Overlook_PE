import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './images/Logo.png'
import './images/Room1.png';
import './images/Room2.png';
import './images/Room3.png';
import './images/Room4.png';
import './images/Room5.png';
import './images/Room6.png';
import './images/Room7.png';
import './images/Room8.png';
import './images/Room9.png';
import './images/Room10.png';
import './images/Room11.png';
import './images/Room12.png';
import './images/Room13.png';
import './images/Room14.png';
import './images/Room15.png';
import './images/Room16.png';
import './images/Room17.png';
import './images/Room18.png';
import './images/Room19.png';
import './images/Room20.png';
import './images/Room21.png';
import './images/Room22.png';
import './images/Room23.png';
import './images/Room24.png';
import './images/Room25.png';

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
const userDashboard = document.querySelector(".user-dashboard");
const loginError = document.querySelector(".form-text");



loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (checkUsername(usernameField.value) && checkPassword(passwordField.value)) {
        console.log("LOGIN SUCCESS!!!")
        loginForm.remove()
        const customerID = getCustomerID(usernameField.value);
        const customerBookings = findBookings(customerID, bookings)
        activeCustomer.name = getCustomerName(customerID);
        activeCustomer.id = customerID
        activeCustomer.bookings = customerBookings
        activeCustomer.totalSpent = findTotalSpent(rooms, activeCustomer.bookings)
        activeCustomer.pastAndUpcomingBookings = splitBookingsByPastAndUpcoming(activeCustomer.bookings)
        displayDashboard();
        displayPreviousRooms(activeCustomer.pastAndUpcomingBookings.pastBookings)
        displayFutureRooms(activeCustomer.pastAndUpcomingBookings.futureBookings)
        console.log(activeCustomer);
        // console.log(bookings)
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
    } else {
      displayUsernameError()
      return false
    }
};

const checkPassword = (password) => {
    if (password === "overlook2021") {
        return true
    } else {
        displayPasswordError()
        return false
    }
};

function getCustomerName(id) {
    const customer = customers.find((customer) => {
        return customer.id === id;
    });
    return customer.name;
}

function displayDashboard() {
  userDashboard.innerHTML = `<h4 class="welcome-message">Welcome, ${activeCustomer.name}</h4>
  <section class="previous-section">
  <h4>Your previous bookings:</h4>
  <div class="container text-center">
    <div class="row">
     <div class="col">
        Column
      </div>
      <div class="col">
       Column
      </div>
      <div class="col">
        Column
      </div>
    </div>
  </div>
  </section>
  <section class="future-section">
  <h4>Your future bookings:</h4>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
    </div>
  </div>
</section> 
    <footer>
      <h4 class="total-spent">You have spent ${activeCustomer.totalSpent}</h4>
    </footer>`;
}
// function getRoomNumbers(customerBookings) {
//   const roomNumbers = customerBookings.map((booking) => booking.roomNumber);
//   return roomNumbers;
// }bo


// function displayPreviousRooms(previousBookings) {
//   const row = document.querySelector(".row");
//   row.innerHTML = ""; // Clear any existing content in the row

//   previousBookings.forEach((booking, i) => {
//     const col = document.createElement("div"); // Create a new div element
//     col.classList.add("col");
    
//     const img = document.createElement("img"); // Create an image element
//     img.src = `./images/Room${i+1}.png`;
//     img.alt = "Bootstrap";
//     img.width = 320;
//     img.height = 180;

//     col.appendChild(img); // Append the image to the column
//     row.appendChild(col); // Append the column to the row
//   });
// }

function displayUsernameError() {
  loginError.innerText = "Incorrect Username, please try again"
}

function displayPasswordError() {
  loginError.innerText = "Incorrect Password, please try again"
}
