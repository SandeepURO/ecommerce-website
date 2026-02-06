document.addEventListener("DOMContentLoaded", () => {
    loadCategoryProducts();
    updateCartCount();
});

function loadCategoryProducts() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat");

    const title = document.getElementById("categoryTitle");
    const desc = document.getElementById("categoryDesc");
    const grid = document.getElementById("categoryGrid");

    if (!category) {
        title.textContent = "All Categories";
        desc.textContent = "Select a category from products page";
        return;
    }

    title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    desc.textContent = `Showing products under "${category}"`;

    const filteredProducts = products.filter(
        p => p.category === category
    );

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>No items available in this category</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = "";

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <div class="product-info">
                <a href="product.html?id=${product.id}" class="product-link">
                    <h3>${product.name}</h3>
                </a>
                <div class="price">$${product.price}</div>
                <button class="add-cart">Add to Cart</button>
            </div>
        `;

        card.querySelector(".add-cart").addEventListener("click", e => {
            e.preventDefault();
            addToCart(product);
        });

        grid.appendChild(card);
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((s, i) => s + i.quantity, 0);

    const cartLink = document.getElementById("cartLink");
    if (cartLink) cartLink.textContent = `Cart (${count})`;
}

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.getAttribute("data-cat");
    window.location.href = `products.html?category=${category}`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.cat;
      window.location.href = `products.html?category=${category}`;
    });
  });
});

