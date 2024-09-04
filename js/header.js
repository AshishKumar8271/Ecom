// Dynamically load header
const loadHeader = async () => {
  const response = await fetch("header.html");
  const headerHTML = await response.text();
  document.getElementById("header-placeholder").innerHTML = headerHTML;

  initializeHeaderEvents();
};

const initializeHeaderEvents = () => {
  const profileBtn = document.getElementById("profile");
  const dropdown = document.getElementById("dropdown");

  profileBtn.addEventListener("click", () => {
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    } else {
      dropdown.classList.add("show");
    }
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  // ---menu functioning: -----

  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const menuList = document.getElementById("menuList");

  menuBtn.addEventListener("click", () => {
    const menuHeight = menu.getBoundingClientRect().height;
    const listHeight = menuList.getBoundingClientRect().height;

    console.log(menuHeight);

    if (menuHeight > 0) {
      menu.style.height = 0;
    } else {
      menu.style.height = `${listHeight}px`;
    }
  });
};

loadHeader();
