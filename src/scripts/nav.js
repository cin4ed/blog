const showMenuBtn = document.getElementById("hamburger-button");
const navBar = document.getElementById("nav-bar");

showMenuBtn.addEventListener("click", () => {
  navBar.classList.toggle("hidden");
});
