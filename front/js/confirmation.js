const displayOrderId = () => {
  //Retrieve the order id
  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById("orderId").innerText = urlParams.get("orderId");
  sessionStorage.removeItem("cart");
};

displayOrderId();