const makeRequest = (verb, url) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(verb, url);
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(JSON.parse(request.response));
        } else {
          reject("Promise rejected");
          console.log("Promise rejected");
        }
      }
    };
  });
};

function postRequest(data, url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("POST", url + "order");
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          reject("Promise Post rejected " + request.status);
        }
      }
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
  });
}

export { makeRequest, postRequest };
