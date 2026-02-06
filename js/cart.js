document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    
    document.getElementById("continueShopping").addEventListener("click", () => {
        window.location.href = "products.html";
    });
    
    document.getElementById("applyCoupon").addEventListener("click", applyCoupon);
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cartItems");
    const cartEmptyMsg = document.getElementById("cartEmptyMsg");
    const cartTableContainer = document.getElementById("cartTableContainer");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartEmptyMsg.style.display = "block";
        cartTableContainer.style.display = "none";
        updateTotals([]);
        return;
    }

    cartEmptyMsg.style.display = "none";
    cartTableContainer.style.display = "block";

    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" class="cart-image" alt="${item.name}"></td>
            <td class="cart-product-name">${item.name}</td>
            <td class="price">$${item.price.toLocaleString()}</td>
            <td>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </td>
            <td class="total-price">$${(item.price * item.quantity).toLocaleString()}</td>
            <td>
                <button class="remove-item" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </td>
        `;
        cartItems.appendChild(row);
    });

    updateTotals(cart);
}

function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        } else if (change > 0) {
            showAddedToast();
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function updateTotals(cart) {
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}


function applyCoupon() {
    const code = document.getElementById("couponCode").value.trim();
    const msg = document.getElementById("couponMsg");
    
    if (code === "SAVE10") {
        msg.textContent = "Coupon applied! 10% discount activated.";
        msg.style.color = "green";
        msg.style.fontWeight = "bold";
    } else {
        msg.textContent = "Invalid coupon code. Try SAVE10";
        msg.style.color = "red";
    }
}


function showAddedToast() {
    // Remove existing toast
    const existingToast = document.querySelector('.added-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement("div");
    toast.className = 'added-toast';
    toast.textContent = "Added!";
    Object.assign(toast.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        background: "#27ae60",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "25px",
        fontWeight: "600",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        zIndex: "9999",
        fontSize: "16px",
        border: "none"
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 2000);
}
