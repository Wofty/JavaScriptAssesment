let noPass;
let ticketCost;
let delivery;
const theForm = document.getElementById('theForm');
const txtName = document.getElementById('inputName');
const txtOrder = document.getElementById('order');
const txtTicket = document.getElementById('fastPass');
const numberOfTickets = document.getElementById('ticketsRequired');
const deliveryOption = document.getElementsByName('delivery');

//output const
const deliveryCost = document.getElementById('deliveryCost');
const results = document.getElementById('results');
const ticketCostOutput = document.getElementById('ticketCost');

//event listeners
window.addEventListener('load', onLoad);
txtOrder.addEventListener('click', calculateOrder);
txtTicket.addEventListener('change', checkTicketPrice);
numberOfTickets.addEventListener('change', numberOfTickets);
deliveryOption.forEach((item) => item.addEventListener('change', checkDeliveryOption));

//default values on load
function onLoad() {
    noPass = 29;
    ticketCost = 0;
    delivery = 0;
    ticketCostOutput.innerText = `£${noPass.toFixed(2)}`;
    deliveryCost.innerText = `£${ticketCost.toFixed(2)}`;
}

//check the changes and display the value on the page
function checkTicketPrice() {
    let ticket = txtTicket.options[txtTicket.selectedIndex].value;
    let price;
    if (ticket == 'NoPass') {
        price = 29;
    } else if (ticket == 'ThreePass') {
        price = 34;
    } else if (ticket == 'FivePass') {
        price = 37;
    } else {
        price = 42;
    }
    ticketCostOutput.innerText = `£ ${price.toFixed(2)} `;
    return price;
}

//check the type of delivery
function checkDeliveryOption() {
    if (this.value == 'eticket') {
        delivery = 0;
    } else if (this.value == 'collect') {
        delivery = 1.5;
    } else if (this.value == 'post') {
        delivery = 3.99;
    }
    deliveryCost.innerText = `£ ${delivery}`;
    return delivery;
}

//calculate the total of the tickets
const isTotal = function () {
    let ticketNr = numberOfTickets.value;
    let price = checkTicketPrice();
    return ticketNr * price;
};

//check the sale price
function checkTheSale() {
    let total = isTotal();
    let ticketNr = numberOfTickets.value;
    if (ticketNr < 4) {
        total = total;
    } else if (ticketNr > 4 && ticketNr < 10) {
        total = total * 0.9;
    } else if (ticketNr >= 10) {
        total = total * 0.85;
    }
    return total;
}
function proccessDisc() {
    let sale = checkTheSale();
    let total = isTotal();
    let discount = checkTheSale();
    let totalDisc = total - discount;
    let ticketNr = numberOfTickets.value;
    if (ticketNr <= 4) {
        return ``;
    } else if (ticketNr > 4 && ticketNr < 10) {
        return `10% discount £${totalDisc.toFixed(2)} <br> 
        Cost after Discount: £${sale}
        `;
    } else if (ticketNr >= 10) {
        return `15% discount ${totalDisc.toFixed(2)} <br>
        Cost after Discount: £${sale}
        `;
    }
}

function totalPriceWithDel() {
    let price = checkTheSale();
    let delivery = checkDeliveryOption();
    return price + delivery;
}

//the final output and the order
function calculateOrder(event) {
    if (theForm.checkValidity()) {
        event.preventDefault();
        let discountTxt = proccessDisc();
        let ticketNr = numberOfTickets.value;
        let clientName = txtName.value;
        let totalWithDel = totalPriceWithDel();
        let total = isTotal();
        results.innerHTML = `
        <p">Name: ${clientName}</p>
        <p>${ticketNr} Tickets at: £${checkTicketPrice()} </p>
        <p>Total cost: £${total}</p>
        <p>${discountTxt}</p>
        <p>Delivery Cost: £${delivery}</p>
        <p>Final Cost: £${totalWithDel.toFixed(2)}</p>  
    `;
    }
}
