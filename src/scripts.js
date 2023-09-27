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
import datepicker from 'js-datepicker'
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
import {
  createAvailableRoomsSection,
  createBookingDateSection,
  createBookingDialog,
  createBookingsSection,
  createCheckbox,
  createCustomerInfoSection,
  createRoomImageTile
} from "./elements";


const DEVELOP = true;

// STATE


let activeCustomer = {};

let rooms = [];
let bookings = [];
let customers = [];
let roomTypes = [];
let filteredRooms = [];
let availableRooms = [];
let checkedRoomTypes = []

let bookDate = null;


// QUERY SELECTORS

const sideBar = document.querySelector('.side-bar');
sideBar.classList.add('hidden')

const mainContentContainer = document.querySelector(".main-content");
mainContentContainer.classList.add('no-sidebar')

const loginForm = document.querySelector(".login-form");
const loginError = document.querySelector(".form-text");
const usernameField = document.querySelector(".username-input");
const passwordField = document.querySelector(".password-input");
const anchorElement = document.querySelector('.navbar-brand.nav-items');


const renderSideBar = () => {
  if (!bookDate) {
    sideBar.classList.add('hidden')
    mainContentContainer.classList.add('no-sidebar')
  } else {
    sideBar.classList.remove('hidden')
    mainContentContainer.classList.remove('no-sidebar')
  }
}

Promise.all([getCustomers, getRooms, getBookings])
  .then(([customersData, roomsData, bookingsData]) => {
    customers = customersData.customers;
    rooms = roomsData.rooms;
    bookings = mergeBookingsWithRooms(bookingsData.bookings, roomsData.rooms)
    roomTypes = extractRoomTypes(rooms)

    // toggleSideBar()

    if (DEVELOP) {
      initDataPostLogin("customer1")
      loginForm.remove()
    }
  });

const extractRoomTypes = (rooms) => {
  const roomTypes = rooms.map(room => room.roomType)
  const uniqueRoomTypes = new Set(roomTypes)
  return Array.from(uniqueRoomTypes)
}


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

function initializeCustomer(customerID, customerBookings) {
  activeCustomer.name = getCustomerName(customerID);
  activeCustomer.id = customerID
  activeCustomer.bookings = customerBookings
  activeCustomer.totalSpent = findTotalSpent(rooms, activeCustomer.bookings)
  activeCustomer.pastAndUpcomingBookings = splitBookingsByPastAndUpcoming(activeCustomer.bookings)
}

const initDataPostLogin = (username) => {
  const customerID = getCustomerID(username);
  const customerBookings = findBookings(customerID, bookings)


  // const modal = createBookingModal()
  // console.log(modal);

  initializeCustomer(customerID, customerBookings)
  displayBookButton()
  displayDashboard();

  createBookingsSection(activeCustomer, 'past', activeCustomer.pastAndUpcomingBookings.pastBookings.length)
  displayPastRooms(activeCustomer.pastAndUpcomingBookings.pastBookings)
  displayUpcomingRooms(activeCustomer.pastAndUpcomingBookings.upcomingBookings, activeCustomer.pastAndUpcomingBookings.pastBookings.length)
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (checkUsername(usernameField.value) && checkPassword(passwordField.value)) {
    initDataPostLogin(usernameField.value);

    console.log(loginForm)
    loginForm.remove()

  }

  clearLoginFields();
});


document.addEventListener("click", function (event) {
  if (event.target.id === 'book-button') {
    mainContentContainer.innerHTML = ""
    mainContentContainer.appendChild(createBookingDateSection())
    initializeDateInput()

    roomTypes.forEach((roomType) => {
      const checkbox = createCheckbox(roomType, roomType)

      checkbox.addEventListener('change', function (event) {
        const checked = event.target.checked;

        if (checked) {
          checkedRoomTypes.push(event.target.id)
        } else {
          checkedRoomTypes = checkedRoomTypes.filter((roomType) => roomType !== event.target.id)
        }

        displayAvailableRooms()
      })

      sideBar.appendChild(checkbox);
    });
  }
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
  mainContentContainer.appendChild(createCustomerInfoSection(activeCustomer))
}

function displayPastRooms(pastBookings) {
  const pastImagesSection = document.querySelector(".past-images");
  pastBookings
    .forEach((booking, index) => pastImagesSection.appendChild(createRoomImageTile(booking.roomNumber, index)));
}

function displayUpcomingRooms(upcomingBookings, startIndex) {
  const upcomingImagesSection = document.querySelector(".upcoming-images");
  upcomingBookings
    .forEach((booking, index) => upcomingImagesSection.appendChild(createRoomImageTile(booking.roomNumber, startIndex + index)));
}

const displayAvailableRooms = () => {
  const availableImagesSection = document.querySelector(".available-images");
  availableImagesSection.innerHTML = ""
  filteredRooms = availableRooms

  if (checkedRoomTypes.length > 0) {
    filteredRooms = availableRooms.filter((room) => checkedRoomTypes.includes(room.roomType))
  }

  filteredRooms
    .forEach((room) => {
      const image = createRoomImageTile(room.number)

      image.addEventListener('click', e => {
        const selectedRoom = rooms.find(room => `${room.number}` === e.target.id)

        const dialog = createBookingDialog(selectedRoom, activeCustomer, bookDate)
        mainContentContainer.appendChild(dialog)

        dialog.showModal()
      })

      availableImagesSection.appendChild(image);
    });
};


function displayUsernameError() {
  loginError.innerText = "Incorrect Username, please try again"
}

function displayPasswordError() {
  loginError.innerText = "Incorrect Password, please try again"
}

function displayBookButton() {
  // Create a new button element
  const newButton = document.createElement('button');
  newButton.className = 'book-a-room-button';
  newButton.textContent = 'Book a Room';
  newButton.id = 'book-button';

  // Append the new button to the anchorElement
  anchorElement.appendChild(newButton);
}


function displayAvailableRoomsSection() {
  document.querySelector('.available-section')?.remove()
  mainContentContainer.appendChild(createAvailableRoomsSection(bookDate))
}

function initializeDateInput() {
  const dateInput = document.querySelector(".datepicker")
  dateInput.addEventListener('change', function () {
    const selectedDate = dateInput.value;
    const formattedDate = selectedDate.replace(/-/g, '/')

    bookDate = formattedDate;
    availableRooms = findAvailableRooms(formattedDate, bookings, rooms)

    displayAvailableRoomsSection()
    displayAvailableRooms()
    renderSideBar()
  });
}

function findAvailableRooms(date, bookings, rooms) {
  return rooms.filter((room) => {
    return isRoomAvailableOnDate(date, room, bookings)
  })
}

function isRoomAvailableOnDate(date, room, bookings) {
  return !bookings.find((booking) => {
    return booking.date === date && room.number === booking.roomNumber
  })
}


