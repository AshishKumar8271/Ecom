const profileBtn = document.getElementById('profile');
const dropdown = document.getElementById('dropdown');

profileBtn.addEventListener('click',() => {
    if(dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
    else {
        dropdown.classList.add('show');
    }
});

document.addEventListener('click',(e) => {
    if(!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
        dropdown.classList.remove('show');
    }
})


// ---menu functioning: -----

const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const menuList = document.getElementById('menuList');

menuBtn.addEventListener('click',() => {
    const menuHeight = menu.getBoundingClientRect().height;
    const listHeight = menuList.getBoundingClientRect().height;

    console.log(menuHeight);

    if(menuHeight > 0) {
        menu.style.height = 0;
    }

    else {
        menu.style.height = `${listHeight}px`;
    }
});


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

