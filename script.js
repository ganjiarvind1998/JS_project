// Toggle search form visibility
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
}

// Toggle login form visibility
let loginForm = document.querySelector('.login-form-container');
document.querySelector('#login-btn').onclick = () => {
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () => {
  loginForm.classList.remove('active');
}

// Hide search form on scroll and manage header visibility
window.onscroll = () => {
  searchForm.classList.remove('active');

  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classList.add('active');
  } else {
    document.querySelector('.header .header-2').classList.remove('active');
  }
}

// Initialize page based on scroll position
window.onload = () => {
  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classList.add('active');
  } else {
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();
}

// Show loader
function loader() {
  document.querySelector('.loader-container').classList.add('active');
}

// Fade out after a delay
function fadeOut() {
  setTimeout(loader, 4000);
}

// Initialize Swipers
var swiper1 = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper2 = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper3 = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper4 = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper5 = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Add item to cart
function addToCart(bookId, bookTitle, bookPrice, bookImage) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item exists in cart, add or update accordingly
  let existingItemIndex = cart.findIndex(item => item.id === bookId);
  
  if (existingItemIndex === -1) {
      cart.push({
          id: bookId,
          title: bookTitle,
          price: bookPrice,
          image: bookImage,
          quantity: 1
      });
  } else {
      cart[existingItemIndex].quantity += 1;  // Increase quantity if already in cart
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
  alert("Item added to cart!");
}

// Event listeners for "add to cart" buttons
document.querySelectorAll('.btn.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
      const bookId = this.getAttribute('data-id');
      const bookTitle = this.getAttribute('data-title');
      const bookPrice = this.getAttribute('data-price');
      const bookImage = this.getAttribute('data-image');
      
      addToCart(bookId, bookTitle, bookPrice, bookImage);
  });
});

// Display cart items
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector("#cart-items");
  cartContainer.innerHTML = '';

  cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="item-details">
              <h4>${item.title}</h4>
              <p>Price: $${item.price}</p>
              <p>Quantity: ${item.quantity}</p>
              <button onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
      `;
      cartContainer.appendChild(itemElement);
  });
}

// Remove item from cart
function removeFromCart(bookId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== bookId);  // Remove item by ID
  localStorage.setItem("cart", JSON.stringify(cart));  // Save updated cart to localStorage
  displayCart();  // Update the cart display
}

// Initialize cart display on page load
displayCart();
