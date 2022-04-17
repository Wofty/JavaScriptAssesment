//variables
let creditCount;
let winnings;

//labels
const labels = document.getElementById('labels');
const creditLabel = document.getElementById('creditLabel');
const winningsLabel = document.getElementById('winningLabels');

//values
const values = document.getElementById('values');
const creditValue = document.getElementById('creditValue');
const winningsValues = document.getElementById('winningsValue');

//reels
const reels = document.getElementById('reels');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

//output
const output = document.getElementById('output');

//buttons
const btnSpin = document.getElementById('spin');
const btnCredit = document.getElementById('credit');
const btnCollect = document.getElementById('collect');

//listeners
window.addEventListener('load', onload);
btnSpin.addEventListener('click', spin);
btnCredit.addEventListener('click', credit);
btnCollect.addEventListener('click', collect);

//!test field

function onload() {
    creditCount = 0;
    winnings = 0;
    imageOne();
    imageTwo();
    imageTree();
}

let slotImage = [
    'bear.png', //
    'cat_cropped.jpg',
    'giraffe.png',
    'hippo.png',
    'hyena.png',
    'leopard.png',
    'lion.png',
    'monkey.png',
    'panda.png',
    'snake.png',
    'tiger.png',
    'wolf.png',
    'zebra.png',
];
//randomly displays the images on the page
function imageOne() {
    let img = Math.ceil(Math.random() * 13) - 1;
    reel1.setAttribute('src', `images/${slotImage[img]}`);
    return img;
}

function imageTwo() {
    let img = Math.ceil(Math.random() * 13) - 1;
    reel2.setAttribute('src', `images/${slotImage[img]}`);
    return img;
}

function imageTree() {
    let img = Math.ceil(Math.random() * 13) - 1;
    reel3.setAttribute('src', `images/${slotImage[img]}`);
    return img;
}
//randomly displays the images on the page

function checkCreditWinnings() {
    let images = [imageOne(), imageTwo(), imageTree()];
    if (images[0] === images[1] && images[1] === images[2]) {
        winnings += 10;
        output.innerText = `You just won another 10 `;
        checkCredit();
    } else if (images[1] === images[2]) {
        winnings += 5;
        output.innerText = `You just won another 5`;
        checkCredit();
    }
}
//output results

function checkCredit() {
    if (creditCount > 0) {
        creditCount -= 1;
    } else if (creditCount === 0) {
        btnSpin.setAttribute('disabled', true);
    }
    winningsValues.innerText = `${winnings}`;
    creditValue.innerText = `${creditCount}`;
}
//check the conditions for adding winnings
function collectBtnActive() {
    if (winnings > 0) {
        btnCollect.removeAttribute('disabled');
    } else {
        btnCollect.setAttribute('disabled', false);
    }
}
//add credit
function credit() {
    creditCount += 2;
    btnSpin.removeAttribute('disabled');
    creditValue.innerText = `${creditCount}`;
}
//collect winnings
function collect() {
    creditCount = 0;
    winnings = 0;
    imageOne();
    imageTwo();
    imageTree();
    checkCredit();
    collectBtnActive();
    output.innerText = `Message`;
}

function spin() {
    checkCreditWinnings();
    checkCredit();
    collectBtnActive();
}
