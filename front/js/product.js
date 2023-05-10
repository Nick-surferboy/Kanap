import { makeRequest, hostApiName } from "./apiRequests.js";
const apiUrl = hostApiName + "products/";

//Get DOM elements
const divImage = document.getElementsByClassName("item__img");
const colors = document.getElementById("colors");
const addToCartBtn = document.getElementById("addToCart");

let id = 0;
if (!sessionStorage.cart) {
  sessionStorage.setItem("cart", JSON.stringify([]));
}
let cart = JSON.parse(sessionStorage.getItem("cart"));

async function displayProduct() {
  //Retrieve the product id clicked previously
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");

  //Retrieve the product to display
  let product = 0;
  const productPromise = makeRequest("GET", apiUrl + "/" + id);
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
  document.getElementById("description").textContent = product.description;

  for (let i = 0; i < product.colors.length; i++) {
    let option = document.createElement("option");
    option.value = product.colors[i];
    option.innerText = product.colors[i];
    colors.appendChild(option);
  }
}

const addToCartHandler = (product) => {
  const existingProductIndex = cart.findIndex(
    (cartItem) => cartItem.id === product.id && cartItem.color === product.color
  );
  const existingCartProduct = cart[existingProductIndex];
  let updatedProduct;
  let updatedCart = [...cart];

  if (existingCartProduct) {
    updatedProduct = {
      ...existingCartProduct,
      quantity: existingCartProduct.quantity + product.quantity,
    };
    updatedCart[existingProductIndex] = updatedProduct;
  } else {
    updatedCart = cart.concat(product);
  }
  return updatedCart;
};

addToCartBtn.addEventListener("click", () => {
  const quantity = parseInt(document.getElementById("quantity").value);
  if (!(quantity >= 1 && quantity <= 100) || colors.value === "") {
    alert("Please enter a valid color and/or number of articles");
    return;
  }
  const productToAdd = {
    id,
    color: colors.value,
    quantity,
    titleCart: document.getElementById("title").textContent,
    imageSrc: divImage[0].getElementsByTagName("img")[0].src,
    imageAlt: divImage[0].getElementsByTagName("img")[0].alt,
    priceCart: document.getElementById("price").textContent,
  };

  sessionStorage.setItem(
    "cart",
    JSON.stringify(addToCartHandler(productToAdd))
  );
});

displayProduct();
