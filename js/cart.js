const productContainer = document.querySelector(".product-container");
const products = document.createElement("div");
products.className = "products";

const clearAllBtn = document.querySelector(".clearAll");
clearAllBtn.addEventListener("click", () => {
  localStorage.clear();
  productContainer.innerHTML = "<p>Your cart is empty!</p>";
})

let totalCash = 0;

const cartItems = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (Object.keys(cart).length == 0) {
    productContainer.innerHTML = "<p>Your cart is empty!</p>";
  } else {
    const cartItems = Object.keys(cart);
    cartItems.forEach((item) => {
      const itemEle = document.createElement("div");
      itemEle.className = "item";

      const itemInfo = document.createElement("div");
      itemInfo.className = "item-info";
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-bowl-food icon";
      const title = document.createElement("p");
      title.className = "food-title";
      title.textContent = cart[item].title;

      const actionPriceContainer = document.createElement("div");
      actionPriceContainer.className = "action-and-price";
      const actions = document.createElement("div");
      actions.className = "actions";

      const increaseQuantityBtn = document.createElement("button");
      increaseQuantityBtn.classList = "quantity-increase-btn";
      increaseQuantityBtn.textContent = "+";

      const decreaseQuantityBtn = document.createElement("button");
      decreaseQuantityBtn.classList = "quantity-decrease-btn";
      decreaseQuantityBtn.textContent = "-";

      const totalQuantity = document.createElement("p");
      totalQuantity.className = "quantity";
      let quantity = cart[item].quantity;
      totalQuantity.textContent = quantity;

      const totalPrice = document.createElement("p");
      totalPrice.classList = "totalPrice";
      const price = cart[item].price * quantity;
      totalPrice.textContent = "$" + price;

      totalCash += price;

      actions.appendChild(decreaseQuantityBtn);
      actions.appendChild(totalQuantity);
      actions.appendChild(increaseQuantityBtn);

      actionPriceContainer.appendChild(actions);
      actionPriceContainer.appendChild(totalPrice);

      itemInfo.appendChild(icon);
      itemInfo.appendChild(title);

      itemEle.appendChild(itemInfo);
      itemEle.appendChild(actionPriceContainer);

      products.appendChild(itemEle);

      productContainer.appendChild(products);

      increaseQuantityBtn.addEventListener("click", () => {
        quantity++;

        updateCartItem(item, quantity, cart, totalPrice, totalQuantity);
      });

      decreaseQuantityBtn.addEventListener("click", () => {
        quantity--;
        if (quantity <= 0) {
          delete cart[item];

          localStorage.setItem("cart", JSON.stringify(cart));

          itemEle.remove();

          totalCash = Object.keys(cart).reduce(
            (total, key) => total + cart[key].price * cart[key].quantity,
            0,
          );

          calculateTotalCash(totalCash);

          if (Object.keys(cart).length == 0) {
            productContainer.innerHTML = "<p>Your cart is empty!</p>";
          }

          const cartItems = document.querySelector(".itemsCount");
          cartItems.textContent = Object.keys(cart).length;
        } else {
          updateCartItem(item, quantity, cart, totalPrice, totalQuantity);
        }
      });
    });

    calculateTotalCash(totalCash);
  }
};

const updateCartItem = (item, quantity, cart, totalPrice, totalQuantity) => {
  totalQuantity.textContent = quantity;
  const newPrice = cart[item].price * quantity;
  totalPrice.textContent = "$" + newPrice.toFixed(2);

  cart[item].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));

  totalCash = Object.keys(cart).reduce(
    (total, key) => total + cart[key].price * cart[key].quantity,
    0,
  );

  calculateTotalCash(totalCash);
};

const calculateTotalCash = (totalCash) => {
  const totalPay = document.querySelector(".totalPay");
  const totalCashEle = document.querySelector(".totalItem");

  totalCashEle.textContent = "$" + totalCash.toFixed(2);

  const deliveryPartnerFee = 20;
  const extraDiscount = 40;
  const platformFee = 6;
  const gstCharges = 13.5;

  let finalTotal =
    totalCash - extraDiscount + deliveryPartnerFee + platformFee + gstCharges;

  totalPay.textContent = "$" + finalTotal.toFixed(2);
};

cartItems();
