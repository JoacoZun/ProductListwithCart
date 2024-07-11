const datos = [
  {
     "image": {
          "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
          "mobile": "./assets/images/image-waffle-mobile.jpg",
          "tablet": "./assets/images/image-waffle-tablet.jpg",
          "desktop": "./assets/images/image-waffle-desktop.jpg"
     },
     "name": "Waffle with Berries",
     "category": "Waffle",
     "price": 6.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
          "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
          "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
          "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
      },
      "name": "Vanilla Bean Crème Brûlée",
      "category": "Crème Brûlée",
      "price": 7.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
          "mobile": "./assets/images/image-macaron-mobile.jpg",
          "tablet": "./assets/images/image-macaron-tablet.jpg",
          "desktop": "./assets/images/image-macaron-desktop.jpg"
      },
      "name": "Macaron Mix of Five",
      "category": "Macaron",
      "price": 8.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
          "mobile": "./assets/images/image-tiramisu-mobile.jpg",
          "tablet": "./assets/images/image-tiramisu-tablet.jpg",
          "desktop": "./assets/images/image-tiramisu-desktop.jpg"
      },
      "name": "Classic Tiramisu",
      "category": "Tiramisu",
      "price": 5.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
          "mobile": "./assets/images/image-baklava-mobile.jpg",
          "tablet": "./assets/images/image-baklava-tablet.jpg",
          "desktop": "./assets/images/image-baklava-desktop.jpg"
      },
      "name": "Pistachio Baklava",
      "category": "Baklava",
      "price": 4.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
          "mobile": "./assets/images/image-meringue-mobile.jpg",
          "tablet": "./assets/images/image-meringue-tablet.jpg",
          "desktop": "./assets/images/image-meringue-desktop.jpg"
      },
      "name": "Lemon Meringue Pie",
      "category": "Pie",
      "price": 5.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
          "mobile": "./assets/images/image-cake-mobile.jpg",
          "tablet": "./assets/images/image-cake-tablet.jpg",
          "desktop": "./assets/images/image-cake-desktop.jpg"
      },
      "name": "Red Velvet Cake",
      "category": "Cake",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
          "mobile": "./assets/images/image-brownie-mobile.jpg",
          "tablet": "./assets/images/image-brownie-tablet.jpg",
          "desktop": "./assets/images/image-brownie-desktop.jpg"
      },
      "name": "Salted Caramel Brownie",
      "category": "Brownie",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
          "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
          "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
          "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
      },
      "name": "Vanilla Panna Cotta",
      "category": "Panna Cotta",
      "price": 6.50
   }
]

let cart = [];

function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  datos.forEach((producto, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('card');
    productCard.innerHTML = `
      <div class="card-image-container">
        <img 
          src="${producto.image.thumbnail}" 
          srcset="${producto.image.mobile} 500w, 
                  ${producto.image.tablet} 1000w, 
                  ${producto.image.desktop} 1500w"
          sizes="(max-width: 600px) 500px, 
                 (max-width: 1200px) 1000px, 
                 1500px" 
          alt="${producto.name}">
        <button class="add-to-cart-button" onclick="addToCart(${index})"> <i class="fas fa-shopping-cart button-icon"></i> Add to Cart</button>
      </div>
      <div class="card-body">
        <h5 class="card-category">${producto.category}</h5>
        <p class="card-title">${producto.name}</p>
        <p class="card-text">$${producto.price.toFixed(2)}</p>
      </div>
    `;
    productList.appendChild(productCard);
  });

  showCartEmptyMessage(cart.length === 0);
}

function addToCart(index) {
  const product = datos[index];
  const cartItem = cart.find(item => item.name === product.name);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const orderTotal = document.getElementById('order-total');
  const cartEmpty = document.getElementById('cart-empty');
  const cartTotalSection = document.querySelector('.cart-total'); // Selección del elemento cart-total

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
      <button onclick="removeFromCart(${index})"><i class="fas fa-times"></i></button>
    `;
    cartItems.appendChild(cartItem);
  });

  cartCount.textContent = cart.length;
  orderTotal.textContent = total.toFixed(2);

  if (cart.length > 0) {
    cartEmpty.style.display = 'none';
    cartTotalSection.classList.add('visible'); // Mostrar el elemento cart-total
  } else {
    cartEmpty.style.display = 'block';
    cartTotalSection.classList.remove('visible'); // Ocultar el elemento cart-total
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

document.getElementById('confirm-order').addEventListener('click', confirmOrder);
document.getElementById('new-order').addEventListener('click', startNewOrder);

function confirmOrder() {
  const orderSummary = document.getElementById('order-summary');
  const orderSummaryTotal = document.getElementById('order-summary-total');
  const orderTotal = document.getElementById('order-total');

  orderSummary.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const summaryItem = document.createElement('p');
    summaryItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    orderSummary.appendChild(summaryItem);
  });

  orderSummaryTotal.textContent = total.toFixed(2);
  document.querySelector('.order-confirmation').classList.remove('hidden');
}

function startNewOrder() {
  cart = [];
  renderCart();
  document.querySelector('.order-confirmation').classList.add('hidden');
}

function showCartEmptyMessage(show) {
  const cartEmpty = document.getElementById('cart-empty');
  const cartTotalSection = document.getElementById('cart-total');

  if (show) {
    cartEmpty.style.display = 'block';
    cartTotalSection.classList.add('hidden');
  } else {
    cartEmpty.style.display = 'none';
    cartTotalSection.classList.remove('hidden');
  }
}

renderProducts();