// ----- slider functioning -----

const slides = document.querySelectorAll('.slide');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let count = 0;

slides.forEach((slide,index) => {
    slide.style.right = `-${index * 100}%`
})

function slideTo (count) {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${count * 100}%)`;
    })
}

function prevSlide() {
    count--;
    if(count < 0) {
        count = slides.length - 1;
    };

    slideTo(count);
}

function nextSlide() {
    count++;
    if(count >= slides.length) {
        count = 0;
    }

    slideTo(count);
};

function autoSliding() {
    deleteInterval = setInterval(() => {
        nextSlide();
    },5000);
}

autoSliding();


const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('mouseover',() => {
    clearInterval(deleteInterval);
})

sliderContainer.addEventListener('mouseout',() => {
    autoSliding();
})