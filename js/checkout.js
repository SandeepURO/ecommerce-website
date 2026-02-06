document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    setupForm();
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    const orderItems = document.getElementById('orderItems');  // ✅ Fixed ID
    let subtotal = 0;
    
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-qty">Qty: ${item.quantity}</div>
                </div>
            </div>
            <div class="item-price">$${itemTotal.toLocaleString()}</div>
        `;
        orderItems.appendChild(div);
    });
    
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    
    document.getElementById('orderSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('orderTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('orderGrandTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('finalTotal').textContent = `$${total.toFixed(2)}`;
}

function setupForm() {
    document.getElementById('shippingForm').addEventListener('submit', handleOrder);
}

function handleOrder(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!firstName || !lastName || !address || !city || !phone) {
        alert('Please fill all required fields');
        return;
    }
    
    const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
    const subtotal = JSON.parse(localStorage.getItem('cart') || '[]')
        .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.10; // +10% tax
    
    const order = {
        orderNumber,
        customer: `${firstName} ${lastName}`,
        address: `${address}, ${city}`,
        phone,
        items: JSON.parse(localStorage.getItem('cart') || '[]'),
        subtotal: subtotal.toFixed(2),
        total: total.toFixed(2),
        date: new Date().toLocaleString()
    };
    
    localStorage.setItem(`order-${orderNumber}`, JSON.stringify(order));
    localStorage.removeItem('cart');
    
    alert(`✅ Order ${orderNumber} placed successfully!`);
    window.location.href = `order-confirmation.html?id=${orderNumber}`;
}
