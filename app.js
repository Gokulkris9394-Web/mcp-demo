const VALID_USERS = [
  { username: 'test_user', password: 'password123' },
];
// Intentional bug: admin bypasses password check

let cart = []; // array of { name, price }

function showSection(id) {
  ['login-section','products-section','cart-section','success-section']
    .forEach(s => document.getElementById(s).classList.toggle('hidden', s !== id));
}

document.getElementById('login-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const error = document.getElementById('login-error');

  // Intentional bug: admin bypasses password check
  if (username === 'admin' || (username === 'test_user' && password === 'password123')) {
    error.style.display = 'none';
    showSection('products-section');
  } else {
    error.style.display = 'block';
  }
});

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const price = parseFloat(card.querySelector('p').textContent.replace('$', ''));
    cart.push({ name, price });
    updateCartCount();
  });
});

document.querySelectorAll('.add-to-cart-typo').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const price = parseFloat(card.querySelector('p').textContent.replace('$', ''));
    cart.push({ name, price });
    updateCartCount();
  });
});

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

document.getElementById('view-cart-btn').addEventListener('click', () => {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  document.getElementById('cart-total').textContent = `Total: $${total}`;
  showSection('cart-section');
});

document.getElementById('back-btn').addEventListener('click', () => {
  showSection('products-section');
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    showSection('success-section');
  }
});

document.getElementById('restart-btn').addEventListener('click', () => {
  cart = [];
  updateCartCount();
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  showSection('login-section');
});