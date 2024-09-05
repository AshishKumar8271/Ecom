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
}
