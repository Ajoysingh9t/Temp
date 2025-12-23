// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!');

    // ========== MOBILE MENU TOGGLE ==========
    const menuBtn = document.querySelector('#1st');
    const nav3rd = document.querySelector('#3rd');
    
    if (menuBtn && nav3rd) {
        menuBtn.addEventListener('click', () => {
            nav3rd.classList.toggle('hidden');
            nav3rd.classList.toggle('flex');
            console.log('Menu toggled');
        });
    }

    // ========== PRODUCT HORIZONTAL SCROLL ==========
    const productScroll = document.getElementById('product-scroll');
    const backIcon = document.querySelector('.backicon');
    const forwIcon = document.querySelector('.forwicon');

    if (backIcon && forwIcon && productScroll) {
        forwIcon.addEventListener('click', () => {
            productScroll.scrollBy({
                left: 350,
                behavior: 'smooth'
            });
        });

        backIcon.addEventListener('click', () => {
            productScroll.scrollBy({
                left: -350,
                behavior: 'smooth'
            });
        });

        // Update button opacity based on scroll position
        productScroll.addEventListener('scroll', () => {
            if (productScroll.scrollLeft <= 0) {
                backIcon.style.opacity = '0.3';
            } else {
                backIcon.style.opacity = '0.5';
            }

            const maxScroll = productScroll.scrollWidth - productScroll.clientWidth;
            if (productScroll.scrollLeft >= maxScroll - 5) {
                forwIcon.style.opacity = '0.3';
            } else {
                forwIcon.style.opacity = '0.5';
            }
        });
    }

    // ========== SMOOTH SCROLL FOR BUTTONS ==========
    const seeCollectionBtns = document.querySelectorAll('button');
    seeCollectionBtns.forEach(btn => {
        if (btn.textContent.includes('SEE COLLECTION')) {
            btn.addEventListener('click', () => {
                const newOnlineSection = document.getElementById('product-scroll');
                if (newOnlineSection) {
                    newOnlineSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            });
        }
    });

    // ========== SHOPPING CART ==========
    let cart = [];
    const cartBtn = document.querySelector('#3rd > div:nth-child(4)');

    function updateCartCount() {
        if (!cartBtn) return;
        
        let badge = cartBtn.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 22px;
                height: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            `;
            cartBtn.style.position = 'relative';
            cartBtn.appendChild(badge);
        }
        
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }

    function addToCart(item) {
        cart.push(item);
        updateCartCount();
        showNotification('✓ Added to cart!');
    }

    // Add click to products
    const productItems = document.querySelectorAll('#product-scroll > div');
    productItems.forEach((product, index) => {
        product.style.cursor = 'pointer';
        product.addEventListener('click', () => {
            const name = product.querySelector('h1')?.textContent || 'Product';
            const price = product.querySelector('p')?.textContent || '$0';
            addToCart({ id: index, name, price });
        });
    });

    // Cart click to view
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty');
            } else {
                showNotification(`You have ${cart.length} item(s) in cart`);
            }
        });
    }

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background: #D59680;
            color: white;
            padding: 16px 24px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.4s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 2500);
    }

    // Add animation styles
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
    `;
    document.head.appendChild(style);

    // ========== SEARCH FUNCTIONALITY ==========
    const searchBtn = document.querySelector('#3rd > div:nth-child(1)');
    if (searchBtn) {
        searchBtn.style.cursor = 'pointer';
        searchBtn.addEventListener('click', () => {
            showNotification('🔍 Search feature');
        });
    }

    // ========== WISHLIST ==========
    const wishlistBtn = document.querySelector('#3rd > div:nth-child(2)');
    if (wishlistBtn) {
        wishlistBtn.style.cursor = 'pointer';
        wishlistBtn.addEventListener('click', () => {
            showNotification('❤️ Wishlist feature');
        });
    }

    // ========== ACCOUNT ==========
    const accountBtn = document.querySelector('#3rd > div:nth-child(3)');
    if (accountBtn) {
        accountBtn.style.cursor = 'pointer';
        accountBtn.addEventListener('click', () => {
            showNotification('👤 Account feature');
        });
    }

    // ========== NEWSLETTER SUBSCRIPTION ==========
    const footerSection = document.querySelector('.w-full.bg-red-100');
    if (footerSection) {
        const subscribeBtn = footerSection.querySelector('button');
        const emailInput = footerSection.querySelector('input[type="text"]');
        
        if (subscribeBtn && emailInput) {
            subscribeBtn.addEventListener('click', () => {
                const email = emailInput.value.trim();
                if (email && email.includes('@') && email.includes('.')) {
                    showNotification('✓ Subscribed successfully!');
                    emailInput.value = '';
                } else {
                    showNotification('⚠️ Please enter valid email');
                }
            });

            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    subscribeBtn.click();
                }
            });
        }
    }

    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background: #D59680;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 9998;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.15)';
        backToTop.style.background = '#c17d67';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
        backToTop.style.background = '#D59680';
    });

    // ========== CURSOR POINTER FOR CLICKABLE ITEMS ==========
    document.querySelectorAll('#3rd > div').forEach(item => {
        item.style.cursor = 'pointer';
    });

    console.log('All functionality initialized!');
});
