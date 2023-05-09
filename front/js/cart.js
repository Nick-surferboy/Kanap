import {
  validateEmail,
  validateName,
  validateCartPrice,
} from "./fieldValidation.js";

import { postRequest } from "./apiRequests.js";
const apiUrl = "http://localhost:3000/api/";

const cart__items = document.getElementById("cart__items");
let cart = JSON.parse(sessionStorage.getItem("cart"));

const displayCart = () => {
  for (let i = 0; i < cart.length; i++) {
    let article = document.createElement("article");
    article.className = "cart__item";
    article.dataset.id = cart[i].id;
    article.dataset.color = cart[i].color;

    let divImage = document.createElement("div");
    divImage.className = "cart__item__img";
    let image = document.createElement("img");
    image.src = cart[i].imageSrc;
    image.alt = cart[i].imageAlt;
    divImage.appendChild(image);
    article.appendChild(divImage);

    let divContent = document.createElement("div");
    divContent.className = "cart__item__content";
    let divContentDesc = document.createElement("div");
    divContentDesc.className = "cart__item__content__description";
    let h2 = document.createElement("h2");
    h2.innerText = cart[i].titleCart;
    let pColor = document.createElement("p");
    pColor.innerText = cart[i].color;
    let pPrice = document.createElement("p");
    pPrice.innerText = "$ " + parseInt(cart[i].priceCart).toLocaleString();
    divContentDesc.appendChild(h2);
    divContentDesc.appendChild(pColor);
    divContentDesc.appendChild(pPrice);

    let divContentSettings = document.createElement("div");
    divContentSettings.className = "cart__item__content__settings";
    let divContentSettingsQuantity = document.createElement("div");
    divContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";
    let pQuantity = document.createElement("p");
    pQuantity.innerText = "Quantity : ";
    divContentSettingsQuantity.appendChild(pQuantity);
    let inputQuantity = document.createElement("input");
    inputQuantity.addEventListener("change", updateCart);
    inputQuantity.type = "number";
    inputQuantity.className = "itemQuantity";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.value = cart[i].quantity;

    let divContentSettingsDelete = document.createElement("div");
    divContentSettingsDelete.className =
      "cart__item__content__settings__delete";
    let pDelete = document.createElement("p");
    pDelete.className = "deleteItem";
    pDelete.innerText = "Delete";
    pDelete.addEventListener("click", removeProductFromCart);
    divContentSettingsQuantity.appendChild(inputQuantity);
    divContentSettingsDelete.appendChild(pDelete);

    divContentSettings.appendChild(divContentSettingsQuantity);
    divContentSettings.appendChild(divContentSettingsDelete);

    divContent.appendChild(divContentDesc);
    divContent.appendChild(divContentSettings);
    article.appendChild(divContent);
    cart__items.appendChild(article);
  }
  document.getElementById("totalPrice").innerText =
    " " + getTotalAmount().toLocaleString();
  document.getElementById("totalQuantity").innerText = cart.length;
  document
    .getElementsByClassName("cart__order__form")[0]
    .addEventListener("submit", orderHandler);
};

const getTotalAmount = () => {
  let totalAmount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount = totalAmount + cart[i].priceCart * cart[i].quantity;
  }
  return totalAmount;
};

const updateCart = (e) => {
  if (e.target.value <= 0 || e.target.value > 100) {
    alert("Please enter a quantity between 1 and 100");
    e.target.value = "";
    return;
  }
  const articleColor = e.target.closest("article").dataset.color;
  const articleId = e.target.closest("article").dataset.id;

  const existingProductIndex = cart.findIndex(
    (cartItem) => cartItem.id === articleId && cartItem.color === articleColor
  );
  const existingCartProduct = cart[existingProductIndex];
  let updatedProduct;
  let updatedCart = [...cart];
  updatedProduct = {
    ...existingCartProduct,
    quantity: e.target.value,
  };
  updatedCart[existingProductIndex] = updatedProduct;
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  document.getElementById("totalPrice").innerText =
    " " + getTotalAmount().toLocaleString();
  window.location.reload();
};

const removeProductFromCart = (e) => {
  const articleColor = e.target.closest("article").dataset.color;
  const articleId = e.target.closest("article").dataset.id;

  updatedCart = cart.filter(
    (item) => !(item.id === articleId && item.color === articleColor)
  );
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  document.getElementById("totalPrice").innerText =
    " " + getTotalAmount().toLocaleString();
  window.location.reload();
};

async function orderHandler(event) {
  event.preventDefault();
  let isFormValide = true;
  document.getElementById("emailErrorMsg").innerText = "";
  document.getElementById("lastNameErrorMsg").innerText = "";
  document.getElementById("firstNameErrorMsg").innerText = "";

  //Input fields validation
  if (!validateName(document.getElementById("firstName").value)) {
    document.getElementById("firstNameErrorMsg").innerText =
      "Please enter a valid first name";
    isFormValide = false;
  }
  if (!validateName(document.getElementById("lastName").value)) {
    document.getElementById("lastNameErrorMsg").innerText =
      "Please enter a valid last name";
    isFormValide = false;
  }
  if (!validateEmail(document.getElementById("email").value)) {
    document.getElementById("emailErrorMsg").innerText =
      "Please enter a valid email adress";
    isFormValide = false;
  }

  if (!isFormValide) {
    return;
  }

  //const isPriceValid = validateCartPrice()

  // alert("1 : " + isPriceValid);
  //  if (isPriceValid) {
  //  alert("2");
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  const products = [];
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i].id);
  }

  const productPromise = postRequest(
    {
      contact: contact,
      products: products,
    },
    apiUrl + "products/"
  );
  try {
    const response = await Promise.all([productPromise]);
   // alert("12" + response[0].orderId);
   console.log(window);
   window.location.replace("./confirmation.html?orderId="+response[0].orderId);
  } catch (error) {
    console.log("This is the error message :" + error);
  }
  // console.log(response);
}

if (sessionStorage.cart) {
  displayCart();
}
