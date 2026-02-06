document.addEventListener('DOMContentLoaded', function () {
    loadProducts();

    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('priceSlider').addEventListener('input', updatePriceRange);
    document.getElementById('sortSelect').addEventListener('change', filterProducts);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);

    updateCartCount();
});

function loadProducts(filteredProducts = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        document.getElementById('resultsCount').textContent = '0 Products';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });

    document.getElementById('resultsCount').textContent =
        `${filteredProducts.length} Products`;
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.addEventListener('click', () => {
        window.location.href = `product.html?id=${product.id}`;
    });

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="rating">⭐ ${(product.rating || 4.0).toFixed(1)}</div>
            <div class="price">$${product.price.toLocaleString()}</div>
            <button class="add-cart">Add to Cart</button>
        </div>
    `;

    const addBtn = card.querySelector('.add-cart');
    addBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        addToCart(product, event.target);
    });

    return card;
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const maxPrice = parseInt(document.getElementById('priceSlider').value);
    const sortBy = document.getElementById('sortSelect').value;

    let filtered = products.filter(product => {
        return (!category || product.category === category) &&
               product.price <= maxPrice;
    });

    switch (sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        default:
            filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    loadProducts(filtered);
}


function updatePriceRange() {
    const slider = document.getElementById('priceSlider');
    document.getElementById('priceMax').textContent =
        `$${parseInt(slider.value).toLocaleString()}`;
    filterProducts();
}

function clearFilters() {
    const slider = document.getElementById('priceSlider');

    document.getElementById('categoryFilter').value = '';
    document.getElementById('sortSelect').value = 'name';

    slider.value = slider.max;
    document.getElementById('priceMax').textContent =
        `$${parseInt(slider.max).toLocaleString()}`;

    loadProducts(products);
}


function addToCart(product, button) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    button.textContent = 'Added!';
    button.style.background = '#27ae60';

    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.background = '';
    }, 1500);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartLink = document.getElementById('cartLink');
    if (cartLink) {
        cartLink.textContent = `Cart (${count})`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
    
    // Filter event listeners
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('priceSlider').addEventListener('input', updatePriceRange);
    document.getElementById('sortSelect').addEventListener('change', filterProducts);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    
    updateCartCount();
});
