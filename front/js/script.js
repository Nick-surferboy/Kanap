import { makeRequest } from "./apiRequests.js";
const apiUrl = "http://localhost:3000/api/products/";

async function displayProducts() {
  try {
    const productsPromise = makeRequest('GET', apiUrl);
    const response = await Promise.all([productsPromise]);
    const products = response[0];
    const sectionItems = document.getElementById("items");

    for (let i = 0; i < products.length; i++) {
      sectionItems.appendChild(
        createProduct(
          products[i]._id,
          products[i].imageUrl,
          products[i].altTxt,
          products[i].name,
          products[i].description
        )
      );
    }
  } catch (error) {
    console.log("This is the error message :" + error);
  }
}

function createProduct(id, imageUrl, alt, name, desc) {
  let image = document.createElement("img");
  image.src = imageUrl;
  image.alt = alt;

  let title = document.createElement("h3");
  title.className = "productName";
  title.innerText = name;

  let paragraph = document.createElement("p");
  paragraph.innerText = desc;

  let article = document.createElement("article");

  let newProduct = document.createElement("a");
  newProduct.href = "./product.html?id=" + id;

  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(paragraph);
  newProduct.appendChild(article);

  return newProduct;
}

displayProducts();
