const apiUrl = "http://localhost:3000/api/products/";

const makeRequest = () => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", apiUrl);
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
}

export { makeRequest };