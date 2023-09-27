import {postBooking} from "./apiCalls";

export const createCheckbox = (id, labelText = '') => {
  const wrapperDiv = document.createElement("div")
  wrapperDiv.classList.add("form-check")

  const input = document.createElement("input")
  input.setAttribute("id", id)
  input.setAttribute("type", "checkbox")
  input.classList.add("form-check-input")

  const label = document.createElement("label")
  label.classList.add("form-check-label")
  label.setAttribute("for", id)
  label.innerText = labelText

  wrapperDiv.appendChild(input)
  wrapperDiv.appendChild(label)

  return wrapperDiv
}

export const createRoomImageTile = (roomNumber, index) => {
  const imageTile = document.createElement("div");
  imageTile.setAttribute('id', `${roomNumber}`)
  imageTile.classList.add("col", "image-tile");

  const img = document.createElement("img");
  img.src = `./images/Room${roomNumber}.png`;
  img.alt = "Bootstrap";
  img.width = 320;
  img.height = 180;

  imageTile.appendChild(img);
  imageTile.setAttribute('tabindex', index)
  return imageTile
}

export const createBookingsSection = (activeCustomer, bookingType, bookingCount) => {
  const bookingsSection = document.createElement("section")
  bookingsSection.classList.add(`${bookingType}-section`)

  const bookingCountText = document.createElement("h4")
  bookingCountText.innerText = `You have ${bookingCount} ${bookingType} bookings:`

  const imagesRowContainer = document.createElement("div")
  imagesRowContainer.classList.add("container", "text-center")

  const imagesRow = document.createElement("div")
  imagesRow.classList.add("row", `${bookingType}-images`)

  imagesRowContainer.appendChild(imagesRow)
  bookingsSection.appendChild(bookingCountText)
  bookingsSection.appendChild(imagesRowContainer)

  return bookingsSection
}
export const createCustomerInfoSection = (activeCustomer) => {
  const wrapper = document.createElement("div")

  const welcomeHeader = document.createElement("h4")
  welcomeHeader.classList.add("welcome-message")
  welcomeHeader.innerText = `Welcome, ${activeCustomer.name}`

  const totalSpentText = document.createElement("h4")
  totalSpentText.classList.add("total-spent")
  totalSpentText.innerText = `You have spent ${activeCustomer.totalSpent} with us.`

  const upcomingBookingsCount = activeCustomer.pastAndUpcomingBookings.upcomingBookings.length
  const upcomingBookingsSection = createBookingsSection(activeCustomer, 'upcoming', upcomingBookingsCount)

  const pastBookingsCount = activeCustomer.pastAndUpcomingBookings.pastBookings.length
  const pastBookingsSection = createBookingsSection(activeCustomer, 'past', pastBookingsCount)

  wrapper.appendChild(welcomeHeader)
  wrapper.appendChild(totalSpentText)
  wrapper.appendChild(pastBookingsSection)
  wrapper.appendChild(upcomingBookingsSection)

  return wrapper
}

export const createAvailableRoomsSection = (bookDate) => {
  const availableSection = document.createElement("section");
  availableSection.classList.add("available-section");

  const header = document.createElement("h4");
  header.innerText = `Room(s) available of ${bookDate}:`;

  const divWrapper = document.createElement("div");
  divWrapper.classList.add("container", "text-center");

  const imageSection = document.createElement("div");
  imageSection.classList.add("row", "available-images");

  availableSection.appendChild(header);
  header.appendChild(divWrapper);
  divWrapper.appendChild(imageSection);
  return availableSection
}

export const createBookingDateSection = () => {
  const welcomeMessage = document.createElement("h4");
  welcomeMessage.classList.add("welcome-message");


  const datePicker = document.createElement("input");
  datePicker.classList.add("datepicker");
  datePicker.setAttribute("type", "date");

  welcomeMessage.appendChild(datePicker);
  return welcomeMessage
}

export const createBookingDialog = (room, user, date,) => {
  const roomDetailsList = document.createElement("ul");

  const roomNumberItem = document.createElement("li");
  roomNumberItem.innerText = `Room Number: ${room.number}`

  const roomTypeItem = document.createElement("li");
  roomTypeItem.innerText = `Room Type: ${room.roomType}`

  const bidetItem = document.createElement("li");
  bidetItem.innerText = `Bidet: ${room.bidet ? "Yes" : "No"}`

  const bedSizeItem = document.createElement("li");
  bedSizeItem.innerText = `Bidet Size: ${room.bedSize}`


  const numberOfBedsItem = document.createElement("li");
  numberOfBedsItem.innerText = `Number of Beds: ${room.numBeds}`

  const costPerNightItem = document.createElement("li");
  costPerNightItem.innerText = `Cost Per Night: $${room.costPerNight}`

  roomDetailsList.append(
    roomNumberItem,
    roomTypeItem,
    bidetItem,
    bedSizeItem,
    numberOfBedsItem,
    costPerNightItem
  )

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.classList.add('btn', 'btn-danger', 'm-2')

  const confirmButton = document.createElement("button");
  confirmButton.innerText = "Confirm Booking";
  confirmButton.classList.add('btn', 'btn-success', 'm-2')

  const buttonsContainer = document.createElement("div");

  buttonsContainer.appendChild(cancelButton);
  buttonsContainer.appendChild(confirmButton);

  const modal = document.createElement("dialog");
  modal.appendChild(roomDetailsList)
  modal.appendChild(buttonsContainer);

  cancelButton.addEventListener("click", () => modal.close())
  confirmButton.addEventListener("click", () => {
    postBooking(user, date, room)
      .then(() => modal.close())
  });
  return modal
}