import './css/styles.css';
import './images/turing-logo.png'
import { 
  getCustomers, 
  getRooms, 
  getSingleCustomer, 
  getBookings, 
  postBooking, 
  deleteBooking,
  getBookingsByID,
} from './apiCalls.js';
import { getCustomerID } from './functions';


let activeCustomer = {};

let customers = null;
let rooms = null;
let bookings = null

Promise.all([getCustomers, getRooms, getBookings])
.then(([customersData, roomsData, bookingsData]) => {
  customers = customersData.customers;
  rooms = roomsData.rooms;
  bookings = bookingsData.bookings;
});



// QUERY SELECTORS

const loginForm = document.getElementById("login-form");
const usernameField = document.getElementById("username-input");
const passwordField = document.getElementById("password-input");
const loginContainer = document.querySelector(".login-container");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();
  
  if (checkUsername(usernameField.value) && checkPassword(passwordField.value)) {
    console.log("LOGIN SUCCESS!!!")
    loginContainer.remove()
    const customerID = getCustomerID(usernameField.value);
    getBookingsByID(customerID)
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
