document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const productsSection = document.getElementById('products-section');
  const cartSection = document.getElementById('cart-section');
  const successSection = document.getElementById('success-section');
  const cartItems = document.getElementById('cart-items');

  let cart = [];

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if ((username === 'test_user' && password === 'password123') || username === 'admin') {
      loginForm.style.display = 'none';
      productsSection.style.display = 'block';
    } else {
      alert('Invalid credentials');
    }
  });

  document.querySelectorAll('.add-to-cart, .add-to-cart-typo').forEach(button => {
    button.addEventListener('click', (e) => {
      const product = e.target.parentElement.querySelector('span').textContent;
      cart.push(product);
      alert(`${product} added to cart.`);
    });
  });

  document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      productsSection.style.display = 'none';
      cartSection.style.display = 'none';
      successSection.style.display = 'block';
    }
  });
});