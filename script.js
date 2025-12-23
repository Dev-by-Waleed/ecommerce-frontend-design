// Key for local storage
const CART_KEY = 'my_shop_cart';

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart(); 
}


function addToCart(product) {
    let cart = getCart();
    
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    renderCart();
}

function updateQuantity(id, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    saveCart(cart);
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    
    container.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = '<div class="alert alert-info">Your cart is empty.</div>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const html = `
                <div class="card mb-3 shadow-sm border rounded">
                    <div class="row g-0">
                        <div class="col-md-3 d-flex align-items-center justify-content-center bg-light">
                            <img src="${item.image}" class="img-fluid rounded-start p-2" alt="${item.name}" style="max-height: 120px;">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h5 class="card-title">${item.name}</h5>
                                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                                <p class="card-text text-muted">$${item.price.toFixed(2)}</p>
                                
                                <div class="d-flex align-items-center mt-3">
                                    <div class="input-group" style="width: 130px;">
                                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                                    </div>
                                    <span class="ms-3 fw-bold">Total: $${itemTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    const discount = 60.00; 
    const tax = 14.00;
    
    const finalTotal = subtotal > 0 ? (subtotal - discount + tax) : 0;

    document.getElementById('summary-subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-discount').innerText = `- $${discount.toFixed(2)}`;
    document.getElementById('summary-tax').innerText = `+ $${tax.toFixed(2)}`;
    document.getElementById('summary-total').innerText = `$${finalTotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    if(getCart().length === 0) {
        addToCart({id: 101, name: "GoPro HERO6 4K", price: 299.00, image: "./assets/Image/tech/8.png"});
        addToCart({id: 102, name: "Canon DSLR", price: 450.00, image: "./assets/Image/tech/image 23.png"});
    }
    
    renderCart();
});