$(document).ready(function () {
  let products = []; 

  let itemNumber = 0;
  if (localStorage.getItem("items")) {
    products = JSON.parse(localStorage.getItem("items"));
    itemNumber = products.length;
  }
  $(".numberOfItems").text(itemNumber);
  

  // when the user clicks the shopping cart button, update .modal-body with the items in the cart
  $(".buttonWrapper").click(function () {
    if (localStorage.getItem("items")) {
      products = JSON.parse(localStorage.getItem("items"));

      let modalBody = $(".modal-body");
      modalBody.empty(); // empty the initial contents of modal body before adding new items

      let totalAmount = 0; // Initialize the overall total to zero

      // Function to calculate the item total for a given product
      function calculateItemTotal(product) {
        return product.quantity * product.price;
      }

      // Function to update the modal content
      function updateModalContent() {
        modalBody.empty(); // empty the modal body before re-rendering
        totalAmount = 0; // Reset the overall total

        // render products name, price, and quantity
        products.map((product) => {
          const itemTotal = calculateItemTotal(product);  // Calculate the total price for the current item
          totalAmount += itemTotal; // Add the current item's total to the overall total

          modalBody.append(
            `<div class="productWrapper" id="${product.name}">
                  <div id="productInfo">
                    <div class="name">${product.name} - $${product.price}/item</div>
                    <div class="quantity">x ${product.quantity}</div>
                    <div class="itemTotal">Total: $${itemTotal.toFixed(2)}</div> <!-- Render the total for the current item -->
                  </div>
                  <img class="cartImage" src=${product.imageData}>
                  <div id="actions">
                    <button class="btn btn-primary increaseQuantity" id="${product.name}">
                      +
                    </button>
                    <button class="btn btn-danger decreaseQuantity" id="${product.name}" ${
                      product.quantity === 1 ? "disabled" : ""
                    }>
                      -
                    </button>               
                </div>
                `
          );
        });

        // Render the overall total at the end
        modalBody.append(`<div class="overallTotal">Overall Total: $${totalAmount.toFixed(2)}</div>`);
        // Add event listeners for increase and decrease buttons after re-rendering
        $(".increaseQuantity").click(increaseQuantityHandler);
        $(".decreaseQuantity").click(decreaseQuantityHandler);
      }      

      function increaseQuantityHandler() {
        // get the id attribute of the button
        let productName = $(this).attr("id");
        // match the productName to the selected item inside products array
        let product = products.find((product) => product.name === productName);
        // then increase the selected item quantity by 1          
        product.quantity++;

        $(this)
        .closest(".productWrapper") // get the closest productWrapper div
        .find(".decreaseQuantity") // get the decreaseQuantity button
        .prop("disabled", false); // enable the button         

        updateModalContent(); // Update the modal content with new values             

        // update the items in localStorage
        localStorage.setItem("items", JSON.stringify(products));
      }

      // callback function for decreasing the quantity
      function decreaseQuantityHandler() {
        let productName = $(this).attr("id");
        // match the productName to the selected item inside products array
        let product = products.find((product) => product.name === productName);
        
        // Using a while loop to decrease the value until it becomes 0          
        if (product.quantity > 0) {
          product.quantity--;          
        } else {
          // Disable the decrease button when quantity is 1 or less
          $(this).prop("disabled", true);  
        }       

        updateModalContent(); // Update the modal content with new values            

        // update the items in localStorage
        localStorage.setItem("items", JSON.stringify(products));          
      }

      // Initial render of the modal content
      updateModalContent();
      
    }
  });
});
