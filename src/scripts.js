// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getCustomers } from './apiCalls.js';


// QUERY SELECTORS

const loginButton = document.getElementById("login-form");
const usernameField = document.getElementById("username-input");
const passwordField = document.getElementById("password-input");

loginButton.addEventListener("submit", function(event) {
  event.preventDefault();
  
  if (checkUsername(usernameField.value) && checkPassword(passwordField.value)) {
    console.log("LOGIN SUCCESS!!!")
  } else {
    console.log("LOGIN FAILURE :(")
  }
  clearLoginFields();
});

// DOM FUNCTIONS

function clearLoginFields() {
  usernameField.value = "";
  passwordField.value = "";
}

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
