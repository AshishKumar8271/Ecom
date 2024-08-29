// Select the container where cards will be added
const cardContainer = document.querySelector(".card-container");

// Function to create and append card elements
const createCard = (product) => {
    // Create and configure elements
    const card = document.createElement('div');
    card.className = 'card';

    const cardImg = document.createElement('img');
    cardImg.src = product.images[0]; // Ensure this property is correct
    cardImg.alt = product.title; // Add alt text for accessibility

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    const productTitle = document.createElement('h5');
    productTitle.textContent = product.title.substring(0,15);

    const productRating = document.createElement('p');
    productRating.className = 'rating';
    let num = Math.floor(Math.random() * 5+1);
    productRating.innerHTML = `⭐ ⭐ ⭐ ⭐ ⭐ <span>${num + 0.1}</span>`; // Adjust property name if necessary

    const box = document.createElement('div');
    box.className = 'box';

    const productPrice = document.createElement('h1');
    productPrice.textContent = `$${product.price}`; // Ensure this property is correct

    const buyBtn = document.createElement('button');
    buyBtn.textContent = 'Buy Now';

    // Assemble the card
    box.appendChild(productPrice);
    box.appendChild(buyBtn);
    cardInfo.appendChild(productTitle);
    cardInfo.appendChild(productRating);
    cardInfo.appendChild(box);
    card.appendChild(cardImg);
    card.appendChild(cardInfo);

    // Append the card to the container
    cardContainer.appendChild(card);
};

// Fetch data and create cards
const productDataApi = async () => {
    const url = "https://api.escuelajs.co/api/v1/products";
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Assuming `data` is an array of products
        data.forEach(product => createCard(product));
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

productDataApi();
