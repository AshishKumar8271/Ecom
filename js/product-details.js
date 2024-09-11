import { calculateRatingStars } from "../helper/calculateRatingStars.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    console.error("No product id found!");
    return;
  }

  const url = "https://shopy-backend.vercel.app";

  try {
    const response = await fetch(url + `/api/v1/products/${productId}`);
    const data = await response.json();
    if (data.success) {
      const product = data.product;
      displayProductDetails(product);
    } else {
      console.error("Failed to fetch product details");
    }
  } catch (error) {
    console.error(error);
  }
});

const displayProductDetails = (product) => {
  const productImg = document.querySelector(".img");
  const productTitle = document.querySelector(".product-title");
  const productDescription = document.querySelector(".product-description");
  const productCategory = document.querySelector(".product-category");
  const productPrice = document.querySelector(".product-price");
  const productRating = document.querySelector(".product-rating");

  productImg.src = product.image;
  productTitle.textContent = product.title;
  productDescription.textContent = product.description;
  productCategory.textContent = "Category: " + product.category;
  productPrice.textContent = "$ " + product.price;
  const ratingStars = calculateRatingStars(product.rating);
  productRating.textContent = `${ratingStars} (${product.rating})`;
};

// Recommended Products
const recommendedSection = document.querySelector(".recommended-section");

const createRecommendedProductCard = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let quantity = cart[product._id]?.quantity || 0;

  const productCard = document.createElement("div");
  productCard.className = "recommended-product-card";

  const productDetails = document.createElement("product-details");
  productDetails.className = "product-details";

  const productTitle = document.createElement("p");
  productTitle.className = "recommended-product-title";
  productTitle.textContent = product.title;

  const productDescription = document.createElement("p");
  productDescription.className = "recommended-product-description";
  productDescription.textContent = product.description;

  const productPrice = document.createElement("p");
  productPrice.className = "recommended-product-price";
  productPrice.textContent = "$" + product.price;

  const productRating = document.createElement("p");
  productRating.className = "recommended-product-rating";
  const ratingStars = calculateRatingStars(product.rating);
  productRating.textContent = `${ratingStars} (${product.rating})`;

  productDetails.appendChild(productTitle);
  productDetails.appendChild(productDescription);
  productDetails.appendChild(productPrice);
  productDetails.appendChild(productRating);

  const imageContainer = document.createElement("div");
  imageContainer.className = "recommended-image-container";

  const img = document.createElement("img");
  img.src = product.image;

  const recommendedActions = document.createElement("div");
  recommendedActions.className = "recommended-actions";

  const increaseQuantity = document.createElement("button");
  increaseQuantity.className = "increase-quantity-btn";
  increaseQuantity.textContent = "+";

  const decreaseQuantity = document.createElement("button");
  decreaseQuantity.className = "decrease-quantity-btn";
  decreaseQuantity.textContent = "-";

  const addButton = document.createElement("button");
  addButton.className = "add-to-cart-btn";
  addButton.textContent = quantity ? quantity : "Add";

  increaseQuantity.style.display = quantity > 0 ? "block" : "none";
  decreaseQuantity.style.display = quantity > 0 ? "block" : "none";

  const divider = document.createElement("div");
  divider.className = "divider";

  recommendedActions.appendChild(decreaseQuantity);
  recommendedActions.appendChild(addButton);
  recommendedActions.appendChild(increaseQuantity);

  imageContainer.appendChild(img);
  imageContainer.appendChild(recommendedActions);

  productCard.appendChild(productDetails);
  productCard.appendChild(imageContainer);

  recommendedSection.appendChild(productCard);
  recommendedSection.appendChild(divider);

  addButton.addEventListener("click", () => {
    if(quantity == 0) {
      quantity++;
    }
    addButton.textContent = quantity;
    if (quantity > 0) {
      increaseQuantity.style.display = "block";
      decreaseQuantity.style.display = "block";
    }

    saveToLocalStorage(product, quantity);
  });

  increaseQuantity.addEventListener("click", () => {
    quantity++;
    addButton.textContent = quantity;

    saveToLocalStorage(product, quantity);
  });

  decreaseQuantity.addEventListener("click", () => {
    quantity--;

    if (quantity < 1) {
      increaseQuantity.style.display = "none";
      decreaseQuantity.style.display = "none";
      addButton.textContent = "Add";
    } else {
      addButton.textContent = quantity;
    }

    saveToLocalStorage(product, quantity);
  });
};

const getRecommendedProducts = async () => {
  const url = `https://shopy-backend.vercel.app`;
  try {
    const response = await fetch(url + "/api/v1/products");
    const data = await response.json();

    const heading2 = document.querySelector(".recommended-header");
    heading2.textContent = `Recommended Products (${data.products.length - 1})`;

    data.products.forEach((product) => createRecommendedProductCard(product));

    const dividers = document.querySelectorAll(".divider");
    if (dividers.length > 0) {
      dividers[dividers.length - 1].style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

getRecommendedProducts();

const saveToLocalStorage = (product, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (quantity <= 0) {
    delete cart[product._id];
  } else {
    cart[product._id] = { ...product, quantity };
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  const cartItems = document.querySelector(".itemsCount");
  if(cart) {
    const cartLength = Object.keys(cart).length;
    cartItems.textContent = cartLength;
  }
  else {
    cartItems.textContent = 0;
  }
};
