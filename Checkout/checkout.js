$(document).ready(function () {
  // Code for rendering cart details
  // You can use the same logic you provided earlier to display cart items and total
  let products = [];

  // Function to calculate the item total for a given product
  function calculateItemTotal(product) {
      return product.quantity * product.price;
  }

  // Function to update the modal content in the checkout page
  function updateModalContent() {
      const modalBody = $(".modal-body");
      modalBody.empty(); // empty the modal body before re-rendering

      let totalAmount = 0; // Reset the overall total

      products.map((product) => {
          const itemTotal = calculateItemTotal(product); // Calculate the total price for the current item
          totalAmount += itemTotal; // Add the current item's total to the overall total

          modalBody.append(
              `<div class="productWrapper my-3" id="${product.name}">
              <div id="productInfo">
                  <div class="name">${product.name} - $${product.price}/item</div>
                  <div class="quantity">x ${product.quantity}</div>
                  <div class="itemTotal">Subtotal: $${itemTotal.toFixed(2)}</div> <!-- Render the total for the current item -->
              </div>
              <div class="image-container"><img src=${product.imageData}></div>              
              </div>
              <hr class=underline>`
          );
      });

      // Render the overall total at the end
      modalBody.append(`<div class="overallTotal">Total: $${totalAmount.toFixed(2)}</div>`);
  }

  // Load the cart items from LocalStorage (Assuming you've saved items in LocalStorage on the cart page)
  if (localStorage.getItem("items")) {
      products = JSON.parse(localStorage.getItem("items"));
  }

  // Initial render of the modal content on the checkout page
  updateModalContent();

  // ... validation logic ...
  const validateInput = function(input, regex) {
    if (regex.test(input.value.trim())) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
  };

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phoneNumber");
  const cardName = document.getElementById("cardName");
  const address = document.getElementById("address");
  const creditCardInput = document.getElementById("creditCardInput");
  const dateInput = document.getElementById("dateInput");
  const cardCVVInput = document.getElementById("cardCVVInput");
  
  firstName.addEventListener("input", () => validateInput(firstName, /^[A-Za-z]+$/));
  lastName.addEventListener("input", () => validateInput(lastName, /^[A-Za-z]+$/));
  email.addEventListener("input", () => validateInput(email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/));
  phoneNumber.addEventListener("input", () => validateInput(phoneNumber, /^\d{3}-\d{3}-\d{4}$/));  
  cardName.addEventListener("input", () => validateInput(cardName, /^[A-Za-z\s]+$/));
  address.addEventListener("input", () => validateInput(address, /^(?:\d+\s)?(?:[A-Za-z\s]+,?\s?)+[A-Za-z]+\s\d{5}(-\d{4})?$/));
  creditCardInput.addEventListener("input", () => validateInput(creditCardInput, /^\d{1,16}$/));
  dateInput.addEventListener("input", () => validateInput(dateInput, /^(0[1-9]|1[0-2])\/\d{2}$/));
  cardCVVInput.addEventListener("input", () => validateInput(cardCVVInput, /^\d{1,3}$/));

    // Initialize Firebase
  const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID",
    measurementId: "MEASUREMENT_ID"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  $("#checkoutForm").submit(async function (event) {
    event.preventDefault();           

    // Trigger the server-side endpoint to send an email
    if (this.checkValidity()) {
      const formData = {
        orderDetails: products,
        customerInfo: $(this).serializeArray()
      };
      
      try {         
          const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            await db.collection("orders").add(orderData);
            alert('Order submitted successfully!');
          } else {
            alert('Failed to submit order. Please try again later.');
          }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      this.classList.add('was-validated');
    }
      
  }); 
});