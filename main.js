let noPass;
let ticketCost;
let delivery;

const theForm = document.getElementById("theForm");
const txtName = document.getElementById("inputName");
const txtOrder = document.getElementById("order");
const txtTicket = document.getElementById("fastPass");
const numberOfTickets = document.getElementById("ticketsRequired");
const deliveryOption = document.getElementsByName("delivery");

//output const
const deliveryCost = document.getElementById("deliveryCost");
const results = document.getElementById("results");
const ticketCostOutput = document.getElementById("ticketCost");

//event listeners
window.addEventListener("load", onLoad);
txtOrder.addEventListener("click", calculateOrder);
txtTicket.addEventListener("change", checkTicketPrice);
numberOfTickets.addEventListener("change", numberOfTickets);
deliveryOption.forEach((item) => item.addEventListener("change", checkDeliveryOption));

//default values on load
function onLoad() {
  noPass = 29;
  ticketCost = 0;
  ticketCostOutput.innerText = `£${noPass.toFixed(2)}`;
  deliveryCost.innerText = `£${ticketCost.toFixed(2)}`;
}

//check the changes and display the value on the page
function checkTicketPrice() {
  let ticket = txtTicket.options[txtTicket.selectedIndex].value;
  let price;
  if (ticket == "NoPass") {
    price = 29;
  } else if (ticket == "ThreePass") {
    price = 34;
  } else if (ticket == "FivePass") {
    price = 37;
  } else {
    price = 42;
  }
  ticketCostOutput.innerText = `£ ${price.toFixed(2)} `;
  return price;
}

//check the type of delivery
function checkDeliveryOption() {
  if (this.value == "eticket") {
    delivery = 0;
  } else if (this.value == "collect") {
    delivery = 1.5;
  } else {
    delivery = 3.99;
  }
  deliveryCost.innerText = `£ ${delivery.toFixed(2)}`;
  return delivery;
}

//calculate the total of the tickets
const isTotal = function () {
  let nr = numberOfTickets.value;
  let price = checkTicketPrice();
  let delivery = checkDeliveryOption();
  return nr * price + delivery;
};

//the final output and the order
function calculateOrder(event) {
  if (theForm.checkValidity()) {
    event.preventDefault();
    let clientName = txtName.value;
    let total = isTotal();
    results.innerText = `this is his name: ${clientName + total}`;
  }
}

/* function calculateOrder(event) {
  if (theForm.checkValidity()) {
    event.preventDefault();
    let clientName = inputName.value;

    results.innerHTML = `<h1>this is a title</h1>
    <p>${clientName}</p>`;
  }
} */
