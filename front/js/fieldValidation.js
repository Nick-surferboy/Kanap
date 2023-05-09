import { makeRequest } from "./apiRequests.js";
let cart = JSON.parse(sessionStorage.getItem("cart"));
const apiUrl = "http://localhost:3000/api/products/";

const validateEmail = (email) => {
  // regex pattern for email
  const re = /\S+@\S+\.\S+/g;

  // check if the email is valid
  let result = re.test(email);
  if (result) {
    return true;
  } else {
    return false;
  }
};

const validateName = (name) => {
  const reg = new RegExp("[0-9]");
  // check if the name is valid
  let result = reg.test(name);
  if (!result) {
    return true;
  } else {
    return false;
  }
};

function validateCartPrice() {
  let recalculatedTotalAmount = 0;
  let cartTotalAmount = 0;
  let isValid = false;

  const productsPromise = makeRequest("GET", apiUrl);
  
  
  productsPromise.then((result) => {
    for (let i = 0; i < cart.length; i++) {
      const existingProductIndex = result.findIndex(
        (cartItem) => cartItem._id === cart[i].id
      );
      recalculatedTotalAmount =
        recalculatedTotalAmount +
        result[existingProductIndex].price * cart[i].quantity;
      cartTotalAmount = cartTotalAmount + cart[i].priceCart * cart[i].quantity;
    }
    if (recalculatedTotalAmount === cartTotalAmount) {
      alert("ok")
      isValid = true;
    } else {
      alert("cheater!");
    }
  });
  productsPromise.catch((error) => {
    document.getElementById("formErrorMsg").innerText =
      "An error occured, please try another time";
    console.log("This is the error message :" + error);
  });
  productsPromise.finally(() => {
    alert("finally")
    return isValid;
  });
}

export { validateEmail, validateName, validateCartPrice };
