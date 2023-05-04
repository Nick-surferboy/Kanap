const makeRequest = (verb, url) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(verb, url);
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        try {
          if (request.status === 200 || request.status === 201) {
            resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        } catch (error) {
          console.log("Reject : " + error);
        }
      }
    };
  });
};

export { makeRequest };
