document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let orderNo = urlParams.get('id');
    
    if (!orderNo) {
        orderNo = localStorage.getItem('orderNo');
    }
    
    if (!orderNo) {
        orderNo = 'ORD' + Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('orderNo', orderNo);
    }
    
    document.getElementById('orderNumber').textContent = orderNo;
    
    updateCartCount();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartLink = document.getElementById('cartLink');
    if (cartLink) {
        cartLink.querySelector('.link-title').textContent = `Cart (${count})`;
    }
}
