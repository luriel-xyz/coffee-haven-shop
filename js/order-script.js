/**
 * This script handles geolocation, coffee order display, and form submission.
 */

/**
 * Gets the current geolocation of the user.
 * @returns {Promise} A promise that resolves with the geolocation position.
 */
function getLocation() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

/**
 * Handles the successful retrieval of geolocation.
 * Updates the location box with the latitude and longitude.
 * @param {Position} position - The geolocation position.
 */
function handleGeolocationSuccess(position) {
  const location = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  updateLocationBox(location);
}

/**
 * Handles errors that occur during geolocation retrieval.
 * Logs the error and updates the location box with unknown coordinates.
 * @param {PositionError} error - The geolocation error.
 */
function handleGeolocationError(error) {
  console.error("Geolocation error:", error);
  updateLocationBox({ latitude: "unknown", longitude: "unknown" });
}

/**
 * Updates the location box with the provided location object.
 * @param {Object} location - The location object containing latitude and longitude.
 */
function updateLocationBox(location) {
  const locationBox = document.getElementById("location");
  locationBox.value = JSON.stringify(location);
}

/**
 * Displays the coffee order details on the page.
 * Retrieves the coffee order from local storage and populates the relevant elements.
 */
function displayCoffeeOrder() {
  const order = localStorage.getItem("order");

  if (order) {
    const coffeeOrder = JSON.parse(order);
    const coffee = document.querySelector(".coffee");

    const orderInput = document.getElementById("coffee-order");
    orderInput.value = order;

    const title = coffee.querySelector(".title");
    const price = coffee.querySelector(".price");
    const desc = coffee.querySelector(".desc");
    const img = coffee.querySelector("img");

    title.textContent = coffeeOrder.title;
    price.textContent = coffeeOrder.price;
    desc.textContent = coffeeOrder.desc;
    img.src = `images/${coffeeOrder.id}.jpg`;
    img.alt = coffeeOrder.title;
  }
}

/**
 * Handles the form submission and displays the modal with the form data.
 * @param {Event} e - The form submit event.
 */
function handleSubmitForm(e) {
  e.preventDefault();

  // Retrieve form data
  const formData = {
    coffeeOrder: document.getElementById("coffee-order").value,
    location: document.getElementById("location").value,
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    address: document.getElementById("address").value,
    province: document.getElementById("province").value,
    postalCode: document.getElementById("postal-code").value,
    comments: document.getElementById("comments").value,
  };

  // Set modal values
  document.getElementById("modalCoffeeOrder").textContent =
    formData.coffeeOrder;
  document.getElementById("modalLocation").textContent = formData.location;
  document.getElementById("modalFirstName").textContent = formData.firstName;
  document.getElementById("modalLastName").textContent = formData.lastName;
  document.getElementById("modalAddress").textContent = formData.address;
  document.getElementById("modalProvince").textContent = formData.province;
  document.getElementById("modalPostalCode").textContent = formData.postalCode;
  document.getElementById("modalComments").textContent = formData.comments;

  // Display the modal
  modal.style.display = "block";
}

/**
 * Initializes the application by fetching geolocation, displaying coffee order details,
 * and setting up event listeners for form submission and modal close button.
 */
function initializeApp() {
  // Fetch geolocation and handle success/error
  getLocation().then(handleGeolocationSuccess).catch(handleGeolocationError);

  // Display coffee order details
  displayCoffeeOrder();

  // Get form and modal elements
  const orderForm = document.getElementById("orderForm");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  // Event listener for form submission
  orderForm.addEventListener("submit", handleSubmitForm);

  // Event listener for modal close button
  closeBtn.addEventListener("click", () => {
    // Close the modal
    modal.style.display = "none";
    window.location.href = "index.html";
  });
}

// Event listener for when the DOM content has been loaded
window.addEventListener("DOMContentLoaded", initializeApp);
