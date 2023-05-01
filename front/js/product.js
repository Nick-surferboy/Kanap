import { makeRequest, apiUrl } from "./apiRequests.js";

//Get DOM elements
const divImage = document.getElementsByClassName("item__img");
const price = document.getElementById("price");
const title = document.getElementById("title");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const addToCartBtn = document.getElementById("addToCart");

let cart = [];

async function displayProduct() {
  //Retrieve the product id clicked previously
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  //Retrieve the product to display
  let product = 0;
  const productPromise = makeRequest('GET', apiUrl+'/'+id);
  try {
    const response = await Promise.all([productPromise]);
    product = response[0];
  } catch (error) {
    console.log(error);
    return;
  }

  //display the product
  let image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  divImage[0].appendChild(image);

  price.textContent = product.price;
  title.textContent = product.name;
  description.textContent = product.description;

  for (let i = 0; i < product.colors.length; i++) {
    let option = document.createElement("option");
    option.value = product.colors[i];
    option.innerText = product.colors[i];
    colors.appendChild(option);
  }
}

addToCartBtn.addEventListener("click", () => {
  if (sessionStorage) {
    //cart = sessionStorage.getItem("cart");
    cart.concat(["Kanp", 2, "Red"]);
    console.log("2:"+ cart)
    sessionStorage.setItem("cart", cart);
  }
});

displayProduct();
