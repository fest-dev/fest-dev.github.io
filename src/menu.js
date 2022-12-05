const menuButton = document.getElementById('mobile-nav-button');
const closeButton = document.getElementById('close-button');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('#nav-list a');

const handleClose = () => {
    navList.classList.remove('nav__list--visible');
    navList.classList.add('nav__list--hidden');
}

menuButton.addEventListener('click', () => {
    navList.classList.remove('nav__list--hidden');
    navList.classList.add('nav__list--visible');
});

closeButton.addEventListener('click', handleClose);
navLinks.forEach((link) => {
    link.addEventListener('click', handleClose);
});

