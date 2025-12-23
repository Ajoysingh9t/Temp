// Mobile Menu Toggle
const menuBtn = document.querySelector('#1st');
const nav3rd = document.querySelector('#3rd');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        nav3rd.classList.remove('hidden');
        nav3rd.classList.add('flex');
    } else {
        nav3rd.classList.add('hidden');
        nav3rd.classList.remove('flex');
    }
});

// Smooth Scroll for "See Collection" buttons
const collectionBtns = document.querySelectorAll('button');
collectionBtns.forEach(btn => {
    if (btn.textContent.includes('SEE COLLECTION')) {
        btn.addEventListener('click', () => {
            const productSection = document.querySelector('#product-scroll');
            productSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});

// Product Scroll Functionality
const productScroll = document.querySelector('#product-scroll');
const backIcon = document.querySelector('.backicon');
const forwIcon = document.querySelector('.forwicon');

const scrollAmount = 300;

forwIcon.addEventListener('click', () => {
    productScroll.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

backIcon.addEventListener('click', () => {
    productScroll.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

// Update scroll buttons visibility
function updateScrollButtons() {
    const maxScroll = productScroll.scrollWidth - productScroll.clientWidth;
    
    if (productScroll.scrollLeft <= 0) {
        backIcon.style.opacity = '0.3';
        backIcon.style.pointerEvents = 'none';
    } else {
        backIcon.style.opacity = '0.5';
        backIcon.style.pointerEvents = 'auto';
    }
    
    if (productScroll.scrollLeft >= maxScroll - 10) {
        forwIcon.style.opacity = '0.3';
        forwIcon.style.pointerEvents = 'none';
    } else {
        forwIcon.style.opacity = '0.5';
        forwIcon.style.pointerEvents = 'auto';
    }
}

productScroll.addEventListener('scroll', updateScrollButtons);
updateScrollButtons();

// Shopping Cart Functionality
let cart = [];
let wishlist = [];

// Add to Cart functionality for product items
const products = document.querySelectorAll('#product-scroll > div');
products.forEach((product, index) => {
    const productData = {
        id: index,
        name: product.querySelector('h1').textContent,
        price: product.querySelector('p').textContent,
        image: product.querySelector('img').src
    };
    
    // Add click event to product
    product.style.cursor = 'pointer';
    product.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            addToCart(productData);
            showNotification('Item added to cart!');
        }
    });
});

function addToCart(product) {
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    const cartElement = document.querySelector('#3rd > div:last-child');
    let cartCount = cartElement.querySelector('.cart-count');
    
    if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.style.cssText = 'position: absolute; top: -8px; right: -8px; background: #D59680; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px;';
        cartElement.style.position = 'relative';
        cartElement.appendChild(cartCount);
    }
    
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #D59680;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Search Functionality
const searchBtn = document.querySelector('#3rd > div:first-child');
searchBtn.addEventListener('click', () => {
    const searchQuery = prompt('What are you looking for?');
    if (searchQuery) {
        showNotification(`Searching for: ${searchQuery}`);
        // Here you would typically filter products
    }
});

// Wishlist Functionality
const wishlistBtn = document.querySelector('#3rd > div:nth-child(2)');
wishlistBtn.addEventListener('click', () => {
    showNotification('Wishlist feature coming soon!');
});

// Account Functionality
const accountBtn = document.querySelector('#3rd > div:nth-child(3)');
accountBtn.addEventListener('click', () => {
    showNotification('Please log in to access your account');
});

// Newsletter Subscription
const subscribeBtn = document.querySelector('.w-full.bg-red-100 button');
const emailInput = document.querySelector('.w-full.bg-red-100 input');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (email && email.includes('@')) {
            showNotification('Successfully subscribed to newsletter!');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address');
        }
    });
}

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.animation = 'fadeIn 0.5s ease-in';
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add hover effects for navigation items
const navItems = document.querySelectorAll('#3rd > div');
navItems.forEach(item => {
    item.style.transition = 'transform 0.2s ease';
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-2px)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #D59680;
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'scale(1.1)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'scale(1)';
});

console.log('Website functionality loaded successfully!');
