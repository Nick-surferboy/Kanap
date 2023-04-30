//Get DOM elements
const divImage = document.getElementsByClassName("item__img");
const price = document.getElementById("price");
const title = document.getElementById("title");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

const apiUrl = "http://localhost:3000/api/products/";

const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", apiUrl + "/" + id);
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200 || request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          reject(JSON.parse(request.response));
        }
      }
    };
  });
};

async function displayProduct() {
  //Retrieve the product id clicked previously
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  //Retrieve the product to display
  let product = 0;
  const productPromise = getProduct(id);
  try {
    const response = await Promise.all([productPromise]);
    product = response[0];
  } catch (error) {
    console.log(error);
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

displayProduct();
