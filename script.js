const menuToggle = document.querySelector('menu-toggle input');
const nav = document.querySelector('navbar-container ul');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('slide');
});