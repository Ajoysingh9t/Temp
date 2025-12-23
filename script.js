// 1. Horizontal Product Scroller Functionality
const scrollContainer = document.getElementById('product-scroll');
const backBtn = document.querySelector('.backicon');
const forwBtn = document.querySelector('.forwicon');

if (scrollContainer && backBtn && forwBtn) {
    // Scroll amount per click
    const scrollAmount = 350; 

    forwBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    backBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // Hide arrows if not needed
    scrollContainer.addEventListener('scroll', () => {
        backBtn.style.opacity = scrollContainer.scrollLeft === 0 ? "0.2" : "0.7";
    });
}

// 2. Mobile Menu Toggle
const menuBtn = document.getElementById('1st'); // shop/menu button
menuBtn.addEventListener('click', () => {
    // Simple alert for demonstration, but you can toggle a sidebar class here
    alert("Opening Menu... In a production app, this would toggle a sidebar/overlay.");
});

// 3. Sticky Header Logic
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg', 'sticky', 'top-0', 'z-50', 'bg-white/95', 'backdrop-blur-sm');
        nav.classList.remove('bg-[#F0E3DB]');
    } else {
        nav.classList.remove('shadow-lg', 'sticky', 'top-0', 'z-50', 'bg-white/95', 'backdrop-blur-sm');
        nav.classList.add('bg-[#F0E3DB]');
    }
});

// 4. Newsletter Subscription Validation
const subscribeBtn = document.querySelector('button:contains("Subscribe")') || document.querySelectorAll('button')[3]; 
const emailInput = document.querySelector('input[type="text"]');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (email === "" || !email.includes('@')) {
            alert("Please enter a valid email address.");
            emailInput.style.borderColor = "red";
        } else {
            alert(`Thank you! ${email} has been added to our newsletter list.`);
            emailInput.value = "";
            emailInput.style.borderColor = "green";
        }
    });
}

// 5. Scroll Reveal Effect (Intersections)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Select sections to animate
document.querySelectorAll('#container > div, #about-us .bg-white').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
    observer.observe(el);
});
