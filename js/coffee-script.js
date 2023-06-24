/*
  This script handles the click event of order buttons on the coffees.html page.
  When an order button is clicked, it captures relevant data, stores it in local storage,
  and redirects the user to the order.html page.
*/

// Run the code when the DOM content has finished loading
window.addEventListener("DOMContentLoaded", (e) => {
  // Get all buttons with a "data-order" attribute
  const orderButtons = document.querySelectorAll("button[data-order]");

  // Attach a click event listener to each order button
  orderButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Get the clicked button and its parent container
      const button = e.currentTarget;
      const container = button.parentNode;

      // Create an order object with relevant data
      const order = {
        id: button.getAttribute("data-order"),
        title: container.querySelector(".title").innerText,
        price: container.querySelector(".price").innerText,
        desc: container.querySelector(".desc").innerText,
      };

      // Store the order object in local storage as a string
      localStorage.setItem("order", JSON.stringify(order));

      // Generate the URL for the order page
      const url = window.location.href.replace("coffees.html", "order.html");

      // Redirect to the order page
      window.location.href = url;
    });
  });
});
