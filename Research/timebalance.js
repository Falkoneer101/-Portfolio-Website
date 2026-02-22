let timeBalance = parseInt(localStorage.getItem('timeBalance')) || 3600;
let timer;
let checkoutAmount = 0;
const walletBalance = parseFloat(localStorage.getItem("walletBalance")) || 0;

function addTime() {
    var additionalTime = parseInt(document.getElementById('additionalTime').value);
    var timeUnit = document.getElementById('timeUnit').value;

    let additionalSeconds = 0;

    if (timeUnit === 'minutes') {
        additionalSeconds = additionalTime * 60;
        checkoutAmount += (additionalTime >= 30) ? 10 : 0;
    } else if (timeUnit === 'hour' || timeUnit === 'hours') {
        additionalSeconds = additionalTime * 3600;
        checkoutAmount += additionalTime * 15; 
    }

    updateCheckoutSection(additionalSeconds);
}

function updateCheckoutSection(additionalSeconds) {
    timeBalance += additionalSeconds;

    var checkoutTime = parseInt(document.getElementById('additionalTime').value);
    var timeUnit = document.getElementById('timeUnit').value;

    if (timeUnit === 'minutes') {
        document.getElementById('checkoutTime').innerText = ' ' + checkoutTime + ' minutes';
    } else if (timeUnit === 'hour') {
        document.getElementById('checkoutTime').innerText = ' ' + checkoutTime + ' hour';
    } else if (timeUnit === 'hours') {
        document.getElementById('checkoutTime').innerText = ' ' + checkoutTime + ' hours';
    }

    document.getElementById('checkoutAmount').innerText = checkoutAmount.toFixed(2);
    document.getElementById('paymentAmount').innerText = 'Amount to pay: ' + checkoutAmount.toFixed(2) + ' pesos';
    document.getElementById('checkoutSection').style.display = 'block';
}

function subtractFromWallet(total) {
   

    if (walletBalance < total) {
        alert("Insufficient funds. Please add money to your wallet.");
        return false;
    } else {
        const newBalance = walletBalance - total;
        localStorage.setItem("walletBalance", newBalance);
        return true;
    }
}

function checkout() {
    const checkoutSuccessful = subtractFromWallet(checkoutAmount);

    if (checkoutSuccessful) {
        localStorage.setItem('timeBalance', timeBalance);
        alert('Checkout Successful!');
    } else {
        alert('Checkout Failed. Insufficient funds in the wallet.');
    }
}

function updateTimeBalance() {
    const timeSpan = document.getElementById("timeBalance");
    const hours = Math.floor(timeBalance / 3600);
    const minutes = Math.floor((timeBalance % 3600) / 60);
    const seconds = timeBalance % 60;

    if (timeBalance >= 3600) {
        timeSpan.textContent = `${hours} hr(s)`;
    } else if (timeBalance >= 60) {
        timeSpan.textContent = `${minutes} min(s)`;
    } else {
        timeSpan.textContent = `${seconds} sec`;
    }

    timeBalance--;

    if (timeBalance <= 0) {
        clearInterval(timer);
        alert("Time's up!");
    }
    timeSpan.textContent = `${hours} hr(s) ${minutes} min(s) ${seconds} sec`;
}

timer = setInterval(updateTimeBalance, 1000);
document.getElementById('timeBalance').innerText = timeBalance;