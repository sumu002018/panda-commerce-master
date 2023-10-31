document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.buy-now');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cartData = [];
    let cartTotal = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            const itemName = item.querySelector('h2').innerText;
            const itemPrice = parseFloat(item.querySelector('price').innerText.slice(8));
            
            addToCart(itemName, itemPrice);
        });
    });

    function addToCart(name, price) {
        const existingItem = cartData.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartData.push({ name, price, quantity: 1 });
        }

        updateCartView();
    }

    function removeFromCart(name) {
        cartData = cartData.filter(item => item.name !== name);
        updateCartView();
    }

    function updateCartView() {
        cartItemsContainer.innerHTML = '';
        cartTotal = 0;

        cartData.forEach(item => {
            const totalForItem = item.price * item.quantity;
            cartTotal += totalForItem;

            const cartItem = document.createElement('li');
            cartItem.innerText = `${item.name} - Quantity: ${item.quantity} - $${totalForItem.toFixed(2)}`;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.innerText = cartTotal.toFixed(2);
    }

    // Event listener to remove items
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const itemName = event.target.dataset.name;
            removeFromCart(itemName);
        }
    });
});
