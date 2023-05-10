import { makeRequest, hostApiName } from "./apiRequests.js";
const apiUrl = hostApiName + "products/";

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

async function validateCartPrice() {
  let recalculatedTotalAmount = 0;
  let cartTotalAmount = 0;
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  const productsPromise = makeRequest("GET", apiUrl);
  const response = await Promise.all([productsPromise]);
  const result = response[0];
  for (let i = 0; i < cart.length; i++) {
    const existingProductIndex = result.findIndex(
      (cartItem) => cartItem._id === cart[i].id
    );
    recalculatedTotalAmount =
      recalculatedTotalAmount +
      result[existingProductIndex].price * cart[i].quantity;
    cartTotalAmount = cartTotalAmount + cart[i].priceCart * cart[i].quantity;
  }

  return new Promise((resolve, reject) => {
    if (recalculatedTotalAmount === cartTotalAmount) {
      resolve(true);
    } else {
      reject("cheater");
    }
  });
}

export { validateEmail, validateName, validateCartPrice };
