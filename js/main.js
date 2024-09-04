// Select the container where cards will be added
const cardContainer = document.querySelector(".card-container");

// Function to create and append card elements
const createCard = (product) => {
    // Create and configure elements
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cursor = "pointer"

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    const cardImg = document.createElement('img');
    cardImg.src = product.image; 
    cardImg.alt = product.title;
    imgWrapper.appendChild(cardImg);

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    const productTitle = document.createElement('h2');
    productTitle.textContent = product.title.substring(0,15);

    const rateDeliveryBox = document.createElement('div');
    rateDeliveryBox.className = "rate-delivery";
    const productRating = document.createElement('p');
    productRating.className = 'card-rating';
    productRating.innerHTML = `${"⭐"}<span>${product.rating}</span>`;
    const deliveryTime = document.createElement('span');
    deliveryTime.className = "delivery-time";
    const minTime = 5;
    const maxtime = 60;
    const randomDeliveryTime = getRandomDeliveryTime(minTime, maxtime);
    deliveryTime.textContent = randomDeliveryTime;
    rateDeliveryBox.appendChild(productRating);
    rateDeliveryBox.appendChild(deliveryTime);

    const box = document.createElement('div');
    box.className = 'box';

    const productPrice = document.createElement('span');
    productPrice.textContent = `Price: $${product.price}`;

    const buyBtn = document.createElement('button');
    buyBtn.textContent = 'Add To Cart';

    // Assemble the card
    box.appendChild(productPrice);
    box.appendChild(buyBtn);
    cardInfo.appendChild(productTitle);
    cardInfo.appendChild(rateDeliveryBox);
    cardInfo.appendChild(box);
    card.appendChild(imgWrapper);
    card.appendChild(cardInfo);

    // Append the card to the container
    cardContainer.appendChild(card);

    card.addEventListener("click", () => {
        window.location.href = `product-details.html?id=${product._id}`;
    });
};

function getRandomDeliveryTime(min, max) {
    const firstTime = Math.floor(Math.random() * (max - min + 1) + min);
    const secondTime = Math.floor(Math.random() * (max - firstTime + 1) + firstTime);
    return `🕕 ${firstTime}-${secondTime} mins`;
}

const productDataApi = async () => {
    const url = `https://shopy-backend.vercel.app`;
    try { 
        const response = await fetch(url + "/api/v1/products");
        const data = await response.json();
        data.products.forEach(product => createCard(product));
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

productDataApi();
