document.addEventListener("DOMContentLoaded", () => {
    loadProductDetails();
    setupQuantityControls();
    setupThumbnailClicks();
    updateCartCount();
});

function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    if (!id || !products.find(p => p.id === id)) {
        alert("Product not found");
        window.location.href = "products.html";
        return;
    }

    const product = products.find(p => p.id === id);

    // Update all elements
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productTitle").textContent = product.name;
    document.getElementById("productPrice").textContent = `$${product.price.toLocaleString()}`;
    document.getElementById("productCategory").textContent = product.category;
    document.getElementById("productDesc").textContent = 
        product.description || `Premium ${product.category} product with excellent quality.`;
    document.getElementById("mainProductImage").src = product.image;
    document.getElementById("mainProductImage").alt = product.name;

    // Rating stars
    const ratingContainer = document.getElementById("productRating");
    const rating = Math.round(product.rating);
    ratingContainer.innerHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating) + 
        ` (${product.rating.toFixed(1)}) (${Math.floor(Math.random() * 200) + 50} reviews)`;

    // Add to cart event
    document.getElementById("addToCartBtn").onclick = () => {
        const qty = parseInt(document.getElementById("productQuantity").value);
        addToCart({ ...product, quantity: qty });
        showAddFeedback();
    };

    loadRelatedProducts(product);
}

function setupThumbnailClicks() {
    document.querySelectorAll(".thumbnail-gallery img").forEach(img => {
        img.addEventListener("click", () => {
            document.getElementById("mainProductImage").src = img.dataset.img;
        });
    });
}

function setupQuantityControls() {
    document.getElementById("qtyPlus").onclick = () => {
        const input = document.getElementById("productQuantity");
        input.value = parseInt(input.value) + 1;
    };
    
    document.getElementById("qtyMinus").onclick = () => {
        const input = document.getElementById("productQuantity");
        if (parseInt(input.value) > 1) input.value--;
    };
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id === product.id);
    
    if (existing) {
        existing.quantity += product.quantity || 1;
    } else {
        cart.push({ ...product });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function showAddFeedback() {
    const btn = document.getElementById("addToCartBtn");
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.background = "#27ae60";
    
    setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
    }, 1500);
}

function loadRelatedProducts(current) {
    const container = document.getElementById("relatedProducts");
    const related = products
        .filter(p => p.category === current.category && p.id !== current.id)
        .slice(0, 4);
    
    container.innerHTML = related.map(p => `
        <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="rating">⭐ ${p.rating.toFixed(1)}</div>
                <div class="price">$${p.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    const cartLink = document.getElementById("cartLink");
    if (cartLink) {
        cartLink.querySelector('.link-title').textContent = `Cart (${count})`;
    }
}
