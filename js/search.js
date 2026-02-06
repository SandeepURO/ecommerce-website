document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
    const count = document.getElementById("resultsCount");
    const suggestionsBox = document.getElementById("suggestions");
    const clearBtn = document.getElementById("clearSearch");

    input.addEventListener("input", handleSearch);
    clearBtn.addEventListener("click", clearSearch);
    updateCartCount();

    function handleSearch() {
        const query = input.value.toLowerCase().trim();
        suggestionsBox.innerHTML = "";

        if (!query) {
            results.innerHTML = "";
            count.textContent = "0 results found";
            suggestionsBox.style.display = "none";
            return;
        }

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        count.textContent = `${filtered.length} results found`;
        results.innerHTML = "";

        filtered.slice(0, 5).forEach(p => {
            const div = document.createElement("div");
            div.className = "suggestion-item";
            div.innerHTML = `<i class="fas fa-search"></i> ${p.name}`;
            div.onclick = () => {
                window.location.href = `product.html?id=${p.id}`;
            };
            suggestionsBox.appendChild(div);
        });

        suggestionsBox.style.display = filtered.length ? "block" : "none";

        filtered.forEach(p => {
            results.innerHTML += `
                <div class="product-card">
                    <a href="product.html?id=${p.id}">
                        <img src="${p.image}" alt="${p.name}" loading="lazy">
                    </a>
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <div class="rating">⭐ ${p.rating.toFixed(1)}</div>
                        <div class="price">$${p.price.toLocaleString()}</div>
                        <button class="add-cart" data-id="${p.id}">Add to Cart</button>
                    </div>
                </div>
            `;
        });

        document.querySelectorAll('.add-cart').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const productId = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === productId);
                addToCart(product);
            };
        });
    }

    function clearSearch() {
        input.value = "";
        results.innerHTML = "";
        suggestionsBox.style.display = "none";
        count.textContent = "0 results found";
        input.focus();
    }
});

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
    if (cartLink) {
        cartLink.querySelector('.link-title').textContent = `Cart (${count})`;
    }
}
