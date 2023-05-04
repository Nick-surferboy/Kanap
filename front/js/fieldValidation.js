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

async function validateTotalAmount() {
  let recalculatedTotalAmount = 0;

  try {
    const productsPromise = makeRequest("GET", apiUrl);
    const response = await Promise.all([productsPromise]);
    const products = response[0];
    alert(products) ;
  } catch (error) {
    document.getElementById("formErrorMsg").innerText =
      "An error occured, please try another time";
    console.log("This is the error message :" + error);
    return;
  }

  for (let i = 0; i < cart.length; i++) {


  }
}

export { validateEmail, validateName, validateTotalAmount };
