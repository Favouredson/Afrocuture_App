import { dataList } from "./data.js";


// Access the data from dataList
let datas = dataList;

// on document ready
$(document).ready(() =>{
    $('#header').load('/template/header/header.html', ()=>{
      $('#headerContactUs')
        .removeClass()
        .addClass("nav-link active text-black fw-bold")
    });

    $("#footer").load("/template/footer/footer.html", ()=>{
      $("#footerContactUs")
        .removeClass()
        .addClass("nav-link active text-black fw-bold");
    });

    // Load shoppingCart.html
    $("#shoppingCart").load("/template/shoppingCart/shoppingCart.html");

    //map each data and render in shopping component 
  const shopCard = document.getElementById("shopCard");
  const cardsHTML = datas.map((item) => `
    <div class="card col-md-4" data-imageurl="${item.image}">
      <div class="img-container"><img id="${item.name}" src="${item.image}" class="border-edge img-size" alt="men outfit"></div>
      <div class="card-body">
          <h5 class="itemName">${item.name}</h5>
          <p class="itemDesc">${item.desc}</p>
          <p class="itemPrice">Price: $${item.price}</p>
          <button class="itemBtn px-2 pb-2">Add item</button>
      </div> 
    </div>
  `).join(''); 

  shopCard.innerHTML = cardsHTML;

  // localStorage.clear();
});

// Define a click event listener for the ".card" elements
// This click event listener is outside the $(document).ready() event
document.addEventListener("click", function(event) {
  if (event.target.closest(".card")) {
    let products = [];
    
    // Populating the products array
    if (localStorage.getItem("items")) {
      products = JSON.parse(localStorage.getItem("items"));
    }

    const clickedCard = event.target.closest(".card");
    const itemName = clickedCard.querySelector(".itemName").textContent;
    const priceText = clickedCard.querySelector('.itemPrice').textContent; 
    const itemPrice = parseInt(priceText.replace('Price: $', ''));

    const imageId = clickedCard.querySelector("img").id;
    const imageElement = document.getElementById(imageId);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageElement, 0, 0);
    const itemURL = canvas.toDataURL();
    // console.log(itemURL);

    let itemExist = false;
    products.forEach((product) => {
      if (product.name === itemName) {
        itemExist = true;
        product.quantity += 1; 
      }
    });

    // Add item to cart if it's not added
    if (!itemExist) {
      products.push({
        name: itemName,
        price: itemPrice,
        imageData: itemURL,
        quantity: 1,
      });
    }

    // Save the products array to localStorage
    localStorage.setItem("items", JSON.stringify(products));

    // Open shoppingCartButton.html and update .numberOfItems div
    $("#shoppingCart").load("/template/shoppingCart/shoppingCart.html", () => {
      $(".numberOfItems").text(products.length);
    });
  }
});
