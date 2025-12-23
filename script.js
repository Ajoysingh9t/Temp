document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.overflow-scroll');
    const backButton = document.querySelector('.fa-less-than').parentElement;
    const forwardButton = document.querySelector('.fa-greater-than').parentElement;
    const itemWidth = document.querySelector('.flex-col').offsetWidth + 40; 
    const scrollAmount = itemWidth * 2; 

    backButton.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    forwardButton.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});