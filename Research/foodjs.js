const menuItems = [
    { id: 1, name: "Ramen", price: 120 },
    { id: 2, name: "Siomai Rice", price: 59},
    { id: 3, name: "Pancit Canton", price: 40 },
    { id: 4, name: "Chicken Burger", price: 60 },
    { id: 5, name: "Sisig", price: 55 }
];

let cart = [];
let walletBalanceElement;

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'block';
    displayCartItems();
    calculateTotal();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'none';
}

function addToCart(itemId) {
    const selectedItem = menuItems.find(item => item.id === itemId);

    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        selectedItem.quantity = 1;
        cart.push(selectedItem);
    }

    displayCartItems();
    calculateTotal();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.name} - ₱${item.price.toFixed(0)} x ${item.quantity}`;
        cartItemsContainer.appendChild(cartItem);
    });
}

function subtractFromWallet(total){
    const amount = document.getElementById('walletBalance');

    if("walletBalance" !== null){
        let currentBalance = parseFloat(localStorage.getItem("walletBalance")) || 0;
        const newBalance = currentBalance - total;

        localStorage.setItem("walletBalance", newBalance);        
    }else{
        alert("Invalid input. Please enter a valid amount.");
    }
}

function calculateTotal() {
    const totalAmountSpan = document.getElementById('totalAmount');
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalAmountSpan.textContent = totalAmount.toFixed(0);
    return totalAmount;
}

function placeOrder() {
    const totalAmount = calculateTotal();
    const walletBalance = parseFloat(localStorage.getItem("walletBalance")) || 0;

    if (walletBalance < totalAmount) {
        alert("Insufficient funds. Please add money to your wallet.");
    } else {
        alert('Order placed successfully!');
        cart = [];
        displayCartItems();

        // Ensure that the checkout amount is an integer
        const integerTotalAmount = Math.floor(totalAmount);
        subtractFromWallet(integerTotalAmount);

        closeCheckoutModal();
        window.location.href = "dashboard.html";
    }
}